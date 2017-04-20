package <%=packageName%>.dto;

<%_ if (fieldsContainBigDecimal == true ) { _%>
import java.math.BigDecimal;
<%_ } _%>
<%_ if (fieldsContainDateTime == true ) { _%>
import java.time.LocalDate;
<%_ } _%>
import lombok.Data;
/* kar-boot-add-page-packages */

@Data
public class <%= entityClass %>Dto {
	  private Long id;
<% for (fieldId in fields) { %>
    private <%= fields[fieldId].fieldType %> <%= fields[fieldId].fieldName %>;
<% } %>

	/* kar-boot-find-by-needle */
}
