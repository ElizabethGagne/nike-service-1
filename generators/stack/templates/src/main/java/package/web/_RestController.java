package <%=packageName%>.web;

import com.codahale.metrics.annotation.Timed;
import <%=packageName%>.dto.<%=entityClass%>Dto;
import <%=packageName%>.facade.<%=entityClass%>Facade;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.validator.constraints.NotBlank;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
/* kar-boot-add-page-packages */

@RestController
@Slf4j
public class <%=entityClass%>Controller extends AbstractController {

  @Autowired
  private <%=entityClass%>Facade <%=entityInstance%>Facade;

  <%_ if (getRestMethod) { _%>
  @GetMapping("/api/<%=entityInstance%>/{id}")
  @Timed
  public ResponseEntity<<%=entityClass%>Dto> get(@Valid @NotBlank @PathVariable final Long id) {
    log.debug("Get <%=entityInstance%> started");
    <%=entityClass%>Dto <%=entityInstance%>dto = this.<%=entityInstance%>Facade.findOne(id);
    ResponseEntity response = null;
    if (<%=entityInstance%>dto == null ) {
      response = new ResponseEntity( HttpStatus.NOT_FOUND);
    } else {
      response = ResponseEntity.ok(<%=entityInstance%>dto);
    }
    log.debug("Get <%=entityInstance%> finished");
    return response;
  }
  <%_ } _%>
  <%_ if (putRestMethod) { _%>

  @PutMapping("/api/<%=entityInstance%>")
  @Timed
  public ResponseEntity<<%=entityClass%>Dto> put(@RequestBody final <%=entityClass%>Dto <%=entityInstance%>Dto) {
    log.debug("Put <%=entityInstance%> started");
    ResponseEntity response = null;
    if (<%=entityInstance%>Dto.getId() == null) {
      response = new ResponseEntity( "{message:No id was provided. For put data ids must be provided}", HttpStatus.NOT_ACCEPTABLE);
    } else {
      <%=entityClass%>Dto rdto = this.<%=entityInstance%>Facade.save(<%=entityInstance%>Dto);
      response = ResponseEntity.ok(rdto);
    }
    log.debug("Put <%=entityInstance%> finished");
    return response;
  }
  <%_ } _%>
  <%_ if (postRestMethod) { _%>

  @PostMapping("/api/<%=entityInstance%>")
  @Timed
  public ResponseEntity<<%=entityClass%>Dto> post(@RequestBody final <%=entityClass%>Dto <%=entityInstance%>Dto) {
    log.debug("Post <%=entityInstance%> started");
    <%=entityClass%>Dto rdto = this.<%=entityInstance%>Facade.save(<%=entityInstance%>Dto);
    log.debug("Post <%=entityInstance%> finished");
    return ResponseEntity.ok(rdto);
  }
  <%_ } _%>

  <%_ if (deleteRestMethod) { _%>

  @DeleteMapping("/api/<%=entityInstance%>")
  @ResponseStatus(value = HttpStatus.NO_CONTENT)
  @Timed
  public void delete(@Valid @NotBlank @PathVariable final Long id) {
    log.debug("Delete <%=entityInstance%> started");
    this.<%=entityInstance%>Facade.delete(id);
    log.debug("Delete <%=entityInstance%> finished");
    }
  <%_ } _%>

  /* kar-boot-find-by-needle */
}
