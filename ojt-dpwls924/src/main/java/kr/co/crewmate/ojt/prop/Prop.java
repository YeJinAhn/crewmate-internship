package kr.co.crewmate.ojt.prop;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.Resource;

import kr.co.crewmate.ojt.web.exception.BadRequestException;


public class Prop {
    private final Logger log = LoggerFactory.getLogger(Prop.class);
    private static Properties props         = new Properties();
    private List<Resource> locations        = new ArrayList<>();

    public Prop(List<Resource> locations) {
        if (locations != null && !locations.isEmpty()) {
            this.locations = locations;
            loadProperties();
        }
    }

    private void loadProperties(){
        log.info("loadProperties start!");
        for(Resource r : locations){
            try {
                log.info("resource uri : {}", r.getURI());
                props.loadFromXML(r.getInputStream());
            } catch (IOException e) {
                log.error("IOException", e);
            }
        }
        log.info("loadProperties end!");
    }


    public void refresh() {
        for(Resource r : locations){
            try {
                props.loadFromXML(r.getInputStream());
            } catch (IOException e) {
                log.error("IOException", e);
            }

        }
    }


    public static String getValue(String key) {
        return getValue(key, null);
    }

    public static String getValue(String key, String defaultValue){
        if(props.containsKey(key)){ return props.getProperty(key); }
        else{
            if(StringUtils.isEmpty(defaultValue)){
                throw new BadRequestException("undefined key => " + key);
            }else{
                return defaultValue;
            }
        }
    }
}
