interface DataTreeBaseItem {
  id: string;
  parentId: string | null;
}

interface DataTreeItem extends DataTreeBaseItem {
  children: DataTreeItem[];
}

export const createDataTree = (data: DataTreeBaseItem[]) => {
  const hashMap: Record<string, DataTreeItem> = {};

  data.forEach(item => {
    hashMap[item.id] = {
      ...item,
      children: [],
    };
  });

  const dataTree: DataTreeItem[] = [];

  data.forEach(item => {
    if (item.parentId && hashMap[item.parentId]) {
      hashMap[item.parentId].children.push(hashMap[item.id]);
    } else {
      dataTree.push(hashMap[item.id]);
    }
  });

  return dataTree;
};

type DataTreeLevelMap = Record<string, number>;

export const getDataTreeLevelMap = (
  dataTree: DataTreeItem[],
  dataTreeLevelMap: DataTreeLevelMap = {},
  level = 1,
) => {
  dataTree.forEach(({id, children}) => {
    if (!dataTreeLevelMap[id]) {
      dataTreeLevelMap[id] = level;

      if (Array.isArray(children) && children.length) {
        getDataTreeLevelMap(children, dataTreeLevelMap, level + 1);
      }
    }
  });

  return dataTreeLevelMap;
};
