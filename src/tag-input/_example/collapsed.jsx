import React, { useState } from 'react';
import { TagInput, Popup, Tag, Space, Radio, Checkbox } from 'tdesign-react';

export default function TagInputCollapsedExample() {
  const [tags, setTags] = useState(['Vue', 'React', 'Miniprogram', 'Angular', 'Flutter']);

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
            disabled={disabled}
            closable={!readonly && !disabled}
            onClose={(context) => onClose({ e: context.e, index: minCollapsedNum + index })}
          >
            {item}
          </Tag>
        ))}
      >
        <Tag size={size} disabled={disabled}>More({count})</Tag>
      </Popup>
    );
  }
  return (
    <Space direction="vertical" style={{ width: '80%' }}>

      <h3>default: </h3>
      <TagInput value={tags} onChange={setTags} minCollapsedNum={1} />

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
      <TagInput
        value={tags}
        onChange={setTags}
        minCollapsedNum={minCollapsedNum}
        collapsedItems={renderCollapsedItems}
        size={size}
        disabled={disabled}
        readonly={readonly}
      ></TagInput>
    </Space>
  );
}
