import React from 'react';

interface ColorBlock {
  name: string;
  color: string;
  description: string;
}

const colorBlocks: ColorBlock[] = [
  {
    name: 'Duffy',
    color: '#B87A56',
    description: '温暖的棕色，像达菲柔软的毛发',
  },
  {
    name: 'ShellieMay',
    color: '#FFB6C1',
    description: '温柔的粉色，充满少女气息',
  },
  {
    name: 'Gelatoni',
    color: '#40E0D0',
    description: '清新的蓝绿色，像艺术家的调色盘',
  },
  {
    name: 'StellaLou',
    color: '#9370DB',
    description: '梦幻的紫色，充满舞者的优雅',
  },
  {
    name: 'CookieAnn',
    color: '#FFD700',
    description: '明亮的金黄色，像美味的饼干',
  },
  {
    name: 'LinaBell',
    color: '#FF69B4',
    description: '活力的粉红色，充满探险精神',
  },
];

const ColorBlocks: React.FC = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">达菲和他的朋友们的主题颜色</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {colorBlocks.map((block) => (
          <div
            key={block.name}
            className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-105"
          >
            <div
              className="h-40"
              style={{ backgroundColor: block.color }}
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{block.name}</h3>
              <p className="text-gray-600">{block.description}</p>
              <p className="text-gray-500 mt-2">色值: {block.color}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColorBlocks; 