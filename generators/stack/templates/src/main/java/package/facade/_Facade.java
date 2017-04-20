package <%=packageName%>.facade;

import <%=packageName%>.dto.<%=entityClass%>Dto;
/* kar-boot-add-page-packages */

public interface <%=entityClass%>Facade {

	<%_ if (saveFacadeMethod) { _%>
	<%=entityClass%>Dto save(<%=entityClass%>Dto <%=entityInstance%>Dto);
	<%_ } _%>
	<%_ if (readFacadeMethod ) { _%>

	<%=entityClass%>Dto findOne(Long id);
	<%_ } _%>
	<%_ if (deleteFacadeMethod ) { _%>

	void delete(Long id);
	<%_ } _%>

	/* kar-boot-find-by-needle */
}
