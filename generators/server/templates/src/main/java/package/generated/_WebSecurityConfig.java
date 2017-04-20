package <%=packageName%>.generated;

import com.auth0.spring.security.api.JwtWebSecurityConfigurer;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

/**
 * @author generated
 */
@Configuration
@ComponentScan("<%=packageName%>")
@Profile("openshift")
@SuppressWarnings("unused")
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

	@Value("${auth0.clientId}")
  	private String auth0Audience;

	@Value("${auth0.issuer}")
	private String auth0Provider;

	@Value("${auth0.clientSecret}")
	private String auth0Token;
  
  	@Override
  	protected void configure(HttpSecurity http) throws Exception {
    JwtWebSecurityConfigurer.forHS256WithBase64Secret(auth0Audience,auth0Provider,auth0Token)
      .configure(http)
      .exceptionHandling()
      .and().authorizeRequests()
        .antMatchers("/api/**").authenticated()
        .anyRequest().permitAll()
      .and().csrf().disable().cors();
  }
}
