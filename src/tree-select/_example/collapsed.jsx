import React, { useState } from 'react';
import { TreeSelect, Tag, Space, Popup, Radio, Checkbox } from 'tdesign-react';

const options = [
  {
    label: '广东省',
    value: 'guangdong',
    children: [
      {
        label: '广州市',
        value: 'guangzhou',
      },
      {
        label: '深圳市',
        value: 'shenzhen',
      },
    ],
  },
  {
    label: '江苏省',
    value: 'jiangsu',
    children: [
      {
        label: '南京市',
        value: 'nanjing',
      },
      {
        label: '苏州市',
        value: 'suzhou',
      },
    ],
  },
];

export default function Example() {
  const [value, setValue] = useState(['guangzhou', 'shenzhen']);
  const [customizeValue, setCustomizeValue] = useState(['guangzhou', 'shenzhen']);

  const [size, setSize] = useState('medium');
  const [disabled, setDisabled] = useState(false);
  const [readonly, setReadonly] = useState(false);
  const [minCollapsedNum] = useState(1);

  const renderCollapsedItems = ({ value, onClose }) => {
    const count = value.length - minCollapsedNum;
    const collapsedTags = value.slice(minCollapsedNum, value.length);
    if (count <= 0) return null;
    return (
      <Popup
        key={'tags'}
        content={collapsedTags.map((item, index) => (
          <Tag
            key={item.value}
            style={{ marginRight: '4px' }}
            size={size}
            disabled={disabled}
            closable={!readonly && !disabled}
            onClose={(context) => onClose({ e: context.e, index: minCollapsedNum + index })}
          >
            {item.label}
          </Tag>
        ))}
      >
        <Tag size={size} disabled={disabled}>More({count})</Tag>
      </Popup>
    );
  }

  return (
    <Space direction="vertical" style={{ width: 300 }}>
      <h3>default: </h3>
      <TreeSelect
        data={options}
        multiple
        clearable
        placeholder="请选择"
        minCollapsedNum={1}
        value={value}
        onChange={(val) => setValue(val)}
      />

      <h3>use collapsedItems: </h3>
      <Space>
        <div>size control:</div>
        <Radio.Group value={size} options={['small', 'medium', 'large']} onChange={setSize} />
      </Space>
      <Space>
        <span>disabled control:</span>
        <Checkbox checked={disabled} onChange={setDisabled} />
      </Space>
      <Space>
        <span>readonly control:</span>
         <Checkbox checked={readonly} onChange={setReadonly} />
      </Space>
      <TreeSelect
        data={options}
        multiple
        clearable
        placeholder="请选择"
        value={customizeValue}
        onChange={(val) => setCustomizeValue(val)}
        minCollapsedNum={minCollapsedNum}
        collapsedItems={renderCollapsedItems}
        size={size}
        disabled={disabled}
        readonly={readonly}
      />
    </Space>
  );
}
