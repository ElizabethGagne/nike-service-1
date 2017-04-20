package <%=packageName%>.business.impl;

import <%=packageName%>.resource.<%=entityClass%>Repository;
import <%=packageName%>.business.<%=entityClass%>Business;
import <%=packageName%>.entity.<%=entityClass%>Entity;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
/* kar-boot-add-page-packages */

@Service
public class <%=entityClass%>BusinessImpl implements <%=entityClass%>Business {

	@Autowired
  private <%=entityClass%>Repository <%=entityInstance%>Repo;

	<%_ if (saveBusinessMethod) { _%>
  @Override
  public <%=entityClass%>Entity save(<%=entityClass%>Entity <%=entityInstance%>)  {
    return this.<%=entityInstance%>Repo.save(<%=entityInstance%>);
  }
	<%_ } _%>
	<%_ if (readBusinessMethod ) { _%>
  @Override
  public <%=entityClass%>Entity findOne(Long id) {
    return this.<%=entityInstance%>Repo.findOne(id);
  }
	<%_ } _%>
	<%_ if (deleteBusinessMethod ) { _%>
  @Override
  public void delete(Long id) {
    this.<%=entityInstance%>Repo.delete(id);
  }
	<%_ } _%>

	/* kar-boot-find-by-needle */
}
