package kr.co.crewmate.ojt.config;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.HandlerExceptionResolver;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.view.tiles3.SimpleSpringPreparerFactory;
import org.springframework.web.servlet.view.tiles3.TilesConfigurer;
import org.springframework.web.servlet.view.tiles3.TilesView;

import kr.co.crewmate.ojt.web.interceptor.OjtInterceptor;
import kr.co.crewmate.ojt.web.resolver.BoExceptionResolver;
import kr.co.crewmate.ojt.web.resolver.CrewTilesViewResolver;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    /**
    *
    * tilesViewResolver를 재정의한 Resolver
    * 우선순위가 internalResourceViewResolver보다 높음
    * tiles 설정파일에 정의된 url 패턴으로 view를 찾아감
    *
    * @since 2019. 12. 4.
    * @author hasd1004
    *
    * @return CrewTilesViewResolver
    */
   @Bean
   public CrewTilesViewResolver tilesViewResolver() {
       CrewTilesViewResolver resolver = new CrewTilesViewResolver();
       resolver.setViewClass(TilesView.class);
       resolver.setOrder(1);
       return resolver;
   }

   /**
    *
    * tiles 설정 정의
    * tile들의 위치 정의, 로딩, 배치 역할해줌
    *
    * @since 2019. 12. 4.
    * @author hasd1004
    *
    * @return TilesConfigurer
    */
   @Bean
   public TilesConfigurer tilesConfigurer() {
       TilesConfigurer configurer = new TilesConfigurer();
       configurer.setDefinitions("/WEB-INF/tiles/tiles-*.xml");
       configurer.setPreparerFactoryClass(SimpleSpringPreparerFactory.class);
       configurer.setCheckRefresh(true);
       return configurer;
   }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new OjtInterceptor());
    }

    @Override
    public void configureHandlerExceptionResolvers(List<HandlerExceptionResolver> resolvers) {
        resolvers.add(new BoExceptionResolver());
    }
}
