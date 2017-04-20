package <%=packageName%>.generated;

import <%=packageName%>.web.AbstractController;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.Arrays;
import java.util.List;

import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.ResponseMessageBuilder;
import springfox.documentation.schema.ModelRef;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.ResponseMessage;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger.web.UiConfiguration;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

/**
 * @author generated
 */
@Configuration
@EnableSwagger2
@Import({ springfox.bean.validators.configuration.BeanValidatorPluginsConfiguration.class})
@ComponentScan(basePackageClasses = {AbstractController.class})
public class SwaggerConfig {

    @Bean
    public Docket swaggerSpringMvcPlugin() {
        return new Docket(DocumentationType.SWAGGER_2)
                .select()
                .paths(PathSelectors.ant("/api/**"))
                .build()
                .enableUrlTemplating(true)
                .globalResponseMessage(RequestMethod.GET, responseMessages)
                .globalResponseMessage(RequestMethod.PUT, responseMessages)
                .globalResponseMessage(RequestMethod.POST, responseMessages)
                ;

    }

    @Bean
    public UiConfiguration uiConfig() {
        return new UiConfiguration("validatorUrl", "list", "alpha", "schema", false, true);
    }

    private List<ResponseMessage> responseMessages = Arrays.asList(
            new ResponseMessageBuilder()
                    .code(200)
                    .message("Success")
                    .responseModel(new ModelRef("Server Error"))
                    .build()
            ,new ResponseMessageBuilder()
                    .code(500)
                    .message("Server Error")
                    .build()
     );

    private ApiInfo apiInfo() {
        return new ApiInfoBuilder()
                .title("<%= title %>")
                .description("<%= title %>")
                .build();
    }
}
