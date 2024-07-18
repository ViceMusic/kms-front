import { Button,  Modal } from 'antd';
import '../App.css';
import { Navigate, useActionData, useNavigate } from 'react-router-dom';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Flex, Input, Tag, theme, Tooltip } from 'antd';
const tagInputStyle = {
  width: 64,
  height: 22,
  marginInlineEnd: 8,
  verticalAlign: 'top',
};

function TagCon() {
    //控制弹窗
    const [isModalOpen, setIsModalOpen] = useState(false);
     
    const showModal = () => {
      setIsModalOpen(true);
    };
    const handleOk = () => {
      setIsModalOpen(false);
      //确认标签的内容
      axios.post('http://localhost:8080/tag/insertBatch', {
        params: {
          tags:tags,
        }
      })
      .then(response => {
        
      })
      .catch(error => {
        // 处理请求错误
        console.error(error);
      });

    };
    const handleCancel = () => {
      setIsModalOpen(false);
    };
    //关于标签
    const { token } = theme.useToken();
  const [tags, setTags] = useState([]);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [editInputIndex, setEditInputIndex] = useState(-1);
  const [editInputValue, setEditInputValue] = useState('');
  const inputRef = useRef(null);
  const editInputRef = useRef(null);
  useEffect(() => {
    axios.get('http://localhost:8080/tag/getAllTag', {
        params: {
        }
      })
      .then(response => {
        setTags(response.data.data)
      })
      .catch(error => {
        // 处理请求错误
        console.error(error);
      });

    
  }, []);
  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, [inputVisible]);
  useEffect(() => {
    editInputRef.current?.focus();
  }, [editInputValue]);
  const handleClose = (removedTag) => {
    const newTags = tags.filter((tag) => tag !== removedTag);
    console.log(newTags);
    setTags(newTags);
  };
  const showInput = () => {
    setInputVisible(true);
  };
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleInputConfirm = () => {
    if (inputValue && !tags.includes(inputValue)) {
      setTags([...tags, inputValue]);
    }
    setInputVisible(false);
    setInputValue('');
  };
  const handleEditInputChange = (e) => {
    setEditInputValue(e.target.value);
  };
  const handleEditInputConfirm = () => {
    const newTags = [...tags];
    newTags[editInputIndex] = editInputValue;
    setTags(newTags);
    setEditInputIndex(-1);
    setEditInputValue('');
  };
  const tagPlusStyle = {
    height: 22,
    background: token.colorBgContainer,
    borderStyle: 'dashed',
  };
    

  return (
    <div style={{display:'flex',alignItems:'center'}}>
      <Button  onClick={showModal}>
        标签管理
      </Button>
      <Modal title="标签管理" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <div>
        <Flex gap="4px 0" wrap>
      {tags.map((tag, index) => {
        if (editInputIndex === index) {
          return (
            <Input
              ref={editInputRef}
              key={tag}
              size="small"
              style={tagInputStyle}
              value={editInputValue}
              onChange={handleEditInputChange}
              onBlur={handleEditInputConfirm}
              onPressEnter={handleEditInputConfirm}
            />
          );
        }
        const isLongTag = tag.length > 20;
        const tagElem = (
          <Tag
            key={tag}
            closable={index !== -1}
            style={{
              userSelect: 'none',
            }}
            onClose={() => handleClose(tag)}
          >
            <span
              onDoubleClick={(e) => {
                if (index !== 0) {
                  setEditInputIndex(index);
                  setEditInputValue(tag);
                  e.preventDefault();
                }
              }}
            >
              {isLongTag ? `${tag.slice(0, 20)}...` : tag}
            </span>
          </Tag>
        );
        return isLongTag ? (
          <Tooltip title={tag} key={tag}>
            {tagElem}
          </Tooltip>
        ) : (
          tagElem
        );
      })}
      {inputVisible ? (
        <Input
          ref={inputRef}
          type="text"
          size="small"
          style={tagInputStyle}
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputConfirm}
          onPressEnter={handleInputConfirm}
        />
      ) : (
        <Tag style={tagPlusStyle} icon={<PlusOutlined />} onClick={showInput}>
          New Tag
        </Tag>
      )}
    </Flex>
    </div><br/>
      </Modal>
    </div>
  );
}

export default TagCon;