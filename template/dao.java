package  ${package};

import java.util.List;
import java.util.Map;
import ${import};

public interface ${className} {
	/**
	 * 功能：添加
	 */
	public void insert(${entity} entity);

	/**
	 * 功能：修改
	 */
	public void update(${entity} entity);

	/**
	 * 功能：删除
	 */
	public void delete(${id} id);

	/**
	 * 功能：查看
	 */
	public ${entity} findOne(${id} id);



	
}
