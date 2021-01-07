package kr.co.crewmate.ojt.config;

import java.util.ArrayList;
import java.util.List;

import javax.sql.DataSource;

import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.type.JdbcType;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.SqlSessionTemplate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.aop.Advisor;
import org.springframework.aop.aspectj.AspectJExpressionPointcut;
import org.springframework.aop.support.DefaultPointcutAdvisor;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.TransactionDefinition;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.transaction.interceptor.DefaultTransactionAttribute;
import org.springframework.transaction.interceptor.NameMatchTransactionAttributeSource;
import org.springframework.transaction.interceptor.RollbackRuleAttribute;
import org.springframework.transaction.interceptor.RuleBasedTransactionAttribute;
import org.springframework.transaction.interceptor.TransactionAttributeSource;
import org.springframework.transaction.interceptor.TransactionInterceptor;

/**
 * 
 * 클래스명: <code>DataBaseConfig</code><br/><br/>
 *
 * ojt database, mybatis transaction 설정
 *
 * @since 2020. 10. 21.
 * @author kjh8877
 *
 */
@Configuration
@EnableTransactionManagement
public class OjtDataBaseConfig {

    private static final Logger log = LoggerFactory.getLogger(OjtDataBaseConfig.class);

    @Bean
    public SqlSessionFactory sqlSessionFactory(DataSource dataSource) throws Exception {
        // mybatis 설정
        org.apache.ibatis.session.Configuration config = new org.apache.ibatis.session.Configuration();
        config.setJdbcTypeForNull(JdbcType.VARCHAR);
        config.setAggressiveLazyLoading(true);
        config.setUseGeneratedKeys(false);
        config.setDefaultStatementTimeout(25000);
        config.setMapUnderscoreToCamelCase(true); // 자동 camelCase가 됨
        config.setUseColumnLabel(true);

        // factory 생성
        SqlSessionFactoryBean sqlSessionFactoryBean = new SqlSessionFactoryBean();
        sqlSessionFactoryBean.setDataSource(dataSource);
        sqlSessionFactoryBean.setTypeAliasesPackage("kr.co.crewmate.ojt.model");
        sqlSessionFactoryBean.setMapperLocations(new PathMatchingResourcePatternResolver().getResources("classpath:/mybatis/mappers/**/*Mapper.xml"));
        sqlSessionFactoryBean.setConfiguration(config);

        return sqlSessionFactoryBean.getObject();
    }

    @Bean(name = "ojtSqlSessionTemplate")
    public SqlSessionTemplate sqlSession(SqlSessionFactory sqlSessionFactory) {
        return new SqlSessionTemplate(sqlSessionFactory);
    }

    @Bean(name = "ojtTransactionManager")
    public PlatformTransactionManager transactionManager(DataSource dataSource) {
        return new DataSourceTransactionManager(dataSource);
    }
    
    /**
     * 트랜젝션을 적용할 method 이름 규칙을 구성함
     * @return
     */
    @Bean(name = "ojtTransactionAttributeSource")
    public TransactionAttributeSource transactionAttributeSource() {
        // 읽기 전용 속성 설정 - 실제 DB 변경작업이 발생해도 commit 자체가 안됨.
        DefaultTransactionAttribute readAttribute = new DefaultTransactionAttribute(TransactionDefinition.PROPAGATION_REQUIRED);
        readAttribute.setReadOnly(true);
        readAttribute.setTimeout(10);

        // 트랜젝션 속성 설정
        List<RollbackRuleAttribute> rollbackRules = new ArrayList<>();
        rollbackRules.add(new RollbackRuleAttribute(Exception.class));

        RuleBasedTransactionAttribute tranAttribute = new RuleBasedTransactionAttribute(TransactionDefinition.PROPAGATION_REQUIRED, rollbackRules);
        tranAttribute.setTimeout(10);
        
        String readOnlyTransactionAttributesDefinition = readAttribute.toString();
        String writeTransactionAttributesDefinition = tranAttribute.toString();

        log.info("Read Only Attributes :: {}", readOnlyTransactionAttributesDefinition);
        log.info("Write Attributes :: {}", writeTransactionAttributesDefinition);

        // method 패턴별 트랜젝션 설정
        // get*, count* 메서드는 readOnly가 정상적으로 적용이 안되는듯
        NameMatchTransactionAttributeSource source = new NameMatchTransactionAttributeSource();
        source.addTransactionalMethod("get*", readAttribute);
        source.addTransactionalMethod("count*", readAttribute);
        source.addTransactionalMethod("*", tranAttribute);

        return source;
    }

    /**
     * 트랜젝션 인터셉터 설정 - 일반적인 txAdvice에 포함되는 내용임 - 서비스의 method이름을 기반으로 트랜젝션의 적용을
     * 결정함
     * @return
     */
    @Bean(name = "ojtTransactionInterceptor")
    public TransactionInterceptor transactionInterceptor(@Qualifier("ojtTransactionAttributeSource") TransactionAttributeSource transactionAttributeSource,
            @Qualifier("ojtTransactionManager") PlatformTransactionManager transactionManager) {
        // 초기화
        TransactionInterceptor txAdvice = new TransactionInterceptor();

        // 설정한 속성 지정 및 transactionMAnager 지정
        txAdvice.setTransactionAttributeSource(transactionAttributeSource);
        txAdvice.setTransactionManager(transactionManager);

        return txAdvice;
    }

    /**
     * 실제 서비스 포인트컷에 트랜젝션을 적용하는 advice
     * @return
     */
    @Bean(name = "ojtServicePointCutTransactionAdvisor")
    public Advisor servicePointCutTransactionAdvisor(
        @Qualifier("ojtTransactionInterceptor") TransactionInterceptor transactionInterceptor
    ) {

        AspectJExpressionPointcut pointcut = new AspectJExpressionPointcut();
        pointcut.setExpression("execution(* kr.co.crewmate..*Service.*(..))");

        return new DefaultPointcutAdvisor(pointcut, transactionInterceptor);
    }
}
