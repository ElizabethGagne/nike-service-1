package <%=packageName%>.facade.impl;

import <%=packageName%>.business.<%=entityClass%>Business;
import <%=packageName%>.facade.<%=entityClass%>Facade;
import <%=packageName%>.dto.<%=entityClass%>Dto;
import <%=packageName%>.entity.<%=entityClass%>Entity;

import org.dozer.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

<%_ if (datastore == 'jpa' ) { _%>
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
<%_ } _%>
/* kar-boot-add-page-packages */

@Service
<%_ if (datastore == 'jpa' ) { _%>
@Transactional(readOnly = true)
<%_ } _%>
public class <%=entityClass%>FacadeImpl implements <%=entityClass%>Facade {

	@Autowired
  private <%=entityClass%>Business <%=entityInstance%>Business;
	@Autowired
  private Mapper mapper;

	<%_ if (saveFacadeMethod) { _%>
	<%_ if (datastore == 'jpa' ) { _%>
	@Transactional(readOnly = false, propagation = Propagation.REQUIRES_NEW)
	<%_ } _%>
	@Override
	public <%=entityClass%>Dto save(<%=entityClass%>Dto <%=entityInstance%>Dto)  {
		<%=entityClass%>Entity <%=entityInstance%> = mapper.map(<%=entityInstance%>Dto, <%=entityClass%>Entity.class);
		return this.mapper.map(this.<%=entityInstance%>Business.save(<%=entityInstance%>), <%=entityClass%>Dto.class);
	}
	<%_ } _%>
	<%_ if (readFacadeMethod ) { _%>
	@Override
	public <%=entityClass%>Dto findOne(Long id) {
		return this.mapper.map(this.<%=entityInstance%>Business.findOne(id), <%=entityClass%>Dto.class);
	}
	<%_ } _%>
	<%_ if (deleteFacadeMethod ) { _%>
	<%_ if (datastore == 'jpa' ) { _%>
	@Transactional(readOnly = false, propagation = Propagation.REQUIRES_NEW)
	<%_ } _%>
	@Override
	public void delete(Long id) {
		this.<%=entityInstance%>Business.delete(id);
	}
	<%_ } _%>

	/* kar-boot-find-by-needle */
}
