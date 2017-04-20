package <%=packageName%>.entity;

import java.io.Serializable;
<%_ if (fieldsContainBigDecimal == true ) { _%>
import java.math.BigDecimal;
<%_ } _%>
<%_ if (fieldsContainDateTime == true ) { _%>
import java.time.LocalDate;
<%_ } _%>

import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldIndex;
import org.springframework.data.elasticsearch.annotations.FieldType;

import lombok.Data;
/* kar-boot-add-page-packages */
/**
 * A <%= entityClass %>.
 */
@Data
@Document(indexName = "<%=indexname%>", type="<%= entityInstance.toLowerCase() %>")
public class <%= entityClass %>Entity implements Serializable {

    @Id
    @Field(type = FieldType.String,
            index = FieldIndex.analyzed,
            searchAnalyzer = "standard",
            store = true)
    private String id;

<% for (fieldId in fields) { %>
	@Field(<% if (fields[fieldId].fieldType == 'BigDecimal') { %>
    	type=FieldType.Double<% } %><% if (fields[fieldId].fieldType == 'DateTime') { %>
    	type=FieldType.Date<% } %><% if (fields[fieldId].fieldType == 'Boolean') { %>
    	type=FieldType.Boolean<% } %><% if (fields[fieldId].fieldType == 'String') { %>
    	type=FieldType.String<% } %><% if (fields[fieldId].fieldType == 'Long') { %>
      type=FieldType.Long<% } %><% if (fields[fieldId].fieldType == 'Integer') { %>
      type=FieldType.Integer<% } %>,
    	index = FieldIndex.analyzed,
        searchAnalyzer = "standard",
        store = true)
    private <%= fields[fieldId].fieldType %> <%= fields[fieldId].fieldName %>;
<% } %>

    /* kar-boot-find-by-needle */
}
