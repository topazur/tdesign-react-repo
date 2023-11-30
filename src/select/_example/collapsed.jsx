import React, { useState } from 'react';

import { Select, Popup, Tag, Space, Radio, Checkbox } from 'tdesign-react';

const options = [
  { label: '选项一', value: '1' },
  { label: '选项二', value: '2' },
  { label: '选项三', value: '3' },
];

const MultipleSelect = () => {
  const [value, setValue] = useState(['1', '3']);

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
            key={item}
            style={{ marginRight: '4px' }}
            size={size}
            // disabled={disabled}
            closable={!readonly && !disabled}
            onClose={(context) => onClose({ e: context.e, index: minCollapsedNum + index })}
          >
            {item}
          </Tag>
        ))}
      >
        <Tag
          size={size}
          // disabled={disabled}
        >More({count})</Tag>
      </Popup>
    );
  }

  return (
    <Space direction="vertical" style={{ width: '80%' }}>

      <h3>default: </h3>
      <Select style={{ width: '40%' }} options={options} value={value} onChange={setValue} multiple minCollapsedNum={1} />

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
      <Select
        style={{ width: '40%' }}
        options={options}
        value={value}
        onChange={setValue}
        multiple
        minCollapsedNum={minCollapsedNum}
        collapsedItems={renderCollapsedItems}
        size={size}
        disabled={disabled}
        readonly={readonly}
      ></Select>
    </Space>
  );
};

export default MultipleSelect;
