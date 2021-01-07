package kr.co.crewmate.ojt.aop;

import java.util.UUID;

import javax.servlet.http.HttpServletRequest;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.slf4j.MDC;
import org.springframework.stereotype.Component;
import org.springframework.util.StopWatch;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import kr.co.crewmate.ojt.model.base.BaseModel;
import kr.co.crewmate.ojt.util.HttpUtil;
import kr.co.crewmate.ojt.util.Util;


@Aspect
@Component
public class LoggingAspect {
    private final Logger log = LoggerFactory.getLogger(LoggingAspect.class);
    
    @Pointcut("execution(* kr.co.crewmate..*Service.*(..))")
    public void servicePointcut() {
        throw new UnsupportedOperationException();
    }

    @Pointcut("execution(* kr.co.crewmate..*Controller.*(..))")
    public void controllerPointcut() {
        throw new UnsupportedOperationException();
    }

    /**
     *
     * @param joinPoint
     * @return
     * @throws Throwable
     */
    @Around("servicePointcut()")
    public Object serviceChecker(ProceedingJoinPoint joinPoint) throws Throwable {
        String className = joinPoint.getSignature().getDeclaringType().getName();
        String serviceName = className.substring(className.lastIndexOf('.') + 1, className.length());
        String methodName = joinPoint.getSignature().getName();
        String serviceMethodName = serviceName + "." + methodName + "()";

        log.debug("### SERVICE 메소드 시작 {}", serviceMethodName);

        StopWatch stopWatch = new StopWatch();

        try {
            stopWatch.start();
            return joinPoint.proceed();
        } catch (Throwable e) {
            log.error("{}", e);
            throw e;
        } finally {
            stopWatch.stop();
            log.debug("### {} SERVICE 메소드 종료 (runtime: {})", serviceMethodName, stopWatch.getTotalTimeMillis());
        }
    }
    
    /**
     * 컨트롤러에서 사용할 다음 정보를 자동으로 설정하여 구성함
     * - mode 값
     * - 햔재 로그인한 관리자 고유번호로 등록자 및 수정자
     * - 현재시간으로 등록 및 수정일시
     * @since 2019. 12. 17.
     * @author kjh8877
     *
     * @param joinPoint
     * @return
     */
    private Object[] getDefaultValuesSetArgs(ProceedingJoinPoint joinPoint) {
        // arguments에서 mode값을 설정해야 하는 항목에 값 설정 처리
        Object[] args = joinPoint.getArgs();
        HttpServletRequest request = ((ServletRequestAttributes)RequestContextHolder.currentRequestAttributes()).getRequest();
        String currIp = HttpUtil.getRemoteAddr(request);

        for (Object o : args) {
            if (o instanceof BaseModel) {
                BaseModel model = (BaseModel) o;
                model.setMode(Util.getMode());
                model.setRegIp(currIp);
                model.setModIp(currIp);
            }
        }
        return args;
    }

    /**
     * 
     * 컨트롤러 관련 공통 AOP
     *
     * @since 2020. 1. 8.
     * @author 2019. 12. 17.
     *
     * @param joinPoint
     * @return
     * @throws Throwable
     */
    @Around("controllerPointcut()")
    public Object controllerChecker(ProceedingJoinPoint joinPoint) throws Throwable {
        String className = joinPoint.getSignature().getDeclaringType().getName();
        String controllerName = className.substring(className.lastIndexOf('.') + 1, className.length());
        String methodName = joinPoint.getSignature().getName();

        String controllerMethodName = controllerName + "." + methodName + "()";

        MDC.put("TX_ID", UUID.randomUUID().toString());
        log.debug("### CONTROLLER 메소드 시작 {}", controllerMethodName);

        StopWatch stopWatch = new StopWatch();

        try {
            stopWatch.start();
            return joinPoint.proceed(this.getDefaultValuesSetArgs(joinPoint));
        } catch (Throwable e) {
            log.error("{}", e);
            throw e;
        } finally {
            stopWatch.stop();
            log.debug("### {} CONTROLLER 메소드 종료 (runtime: {})", controllerMethodName, stopWatch.getTotalTimeMillis());
            MDC.clear();
        }
    }
}
