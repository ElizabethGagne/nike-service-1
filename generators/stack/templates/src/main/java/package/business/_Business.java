package <%=packageName%>.business;

import <%=packageName%>.entity.<%=entityClass%>Entity;
/* kar-boot-add-page-packages */

public interface <%=entityClass%>Business {

	<%_ if (saveBusinessMethod) { _%>
	<%=entityClass%>Entity save(<%=entityClass%>Entity <%=entityInstance%>);
	<%_ } _%>
	<%_ if (readBusinessMethod ) { _%>

	<%=entityClass%>Entity findOne(Long id);
	<%_ } _%>
	<%_ if (deleteBusinessMethod ) { _%>

	void delete(Long id);
	<%_ } _%>

	/* kar-boot-find-by-needle */
}
