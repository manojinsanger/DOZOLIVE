

// enum MenuType {
//     Group, // 菜单组
//     Filter, // 滤镜项
//     Param, // 参数项
// };

// interface MenuItem {
//     type: MenuType;      // 菜单类型
//     name: string;        // 菜单项名称
//     params?: string;     // 附带参数
//     enable?: boolean;    // 是否启用，默认为true
//     intensity?: number;  // 初始的效果强度值，默认为50
//     intensityRange?: [number, number]; // 强度范围，默认为[0, 100]
//     items?: MenuItem[];  // 子菜单
//     selectedItem?: number; // 选中项，默认为-1
// }

enum MenuType {
  Group, // Menu group
  Filter, // Filter item
  Param, // Parameter item
}

interface MenuItem {
  type: MenuType; // Menu type
  name: string; // Menu item name
  params?: string; // Optional parameters
  enable?: boolean; // Whether enabled, defaults to true
  intensity?: number; // Initial effect intensity value, defaults to 50
  intensityRange?: [number, number]; // Intensity range, defaults to [0, 100]
  items?: MenuItem[]; // Submenu items
  selectedItem?: number; // Selected item, defaults to -1
}