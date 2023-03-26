import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { CHRONOLOGICAL_RESUME, EDUCATION, EMPLOYMENT_HISTORY, FUNCTIONAL_RESUME, HOW_TO_WRITE_A_RESUME, INTERNATIONAL_RESUMES, LANGUAGES, PROOFREADING, REFERENCES, RESUME_FORMATS, SKILLS, SUMMARY_OBJECTIVE } from '../../../../configs/constants/blog.constants';

import styles from '../styles.module.scss'

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key?: React.Key | null,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

function key2Label(key: string) {
  key = key.replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => {
    return ' ' + chr;
  });
  return key.charAt(0).toUpperCase() + key.slice(1);
}

const items: MenuItem[] = [
  getItem('Fundamentals', 'fundamentals', null, [
    getItem(key2Label(HOW_TO_WRITE_A_RESUME), HOW_TO_WRITE_A_RESUME),
    getItem(key2Label(RESUME_FORMATS), RESUME_FORMATS),
    getItem(key2Label(CHRONOLOGICAL_RESUME), CHRONOLOGICAL_RESUME),
    getItem(key2Label(FUNCTIONAL_RESUME), FUNCTIONAL_RESUME),
  ]),

  getItem('Resume elements', 'resume-element', null, [
    getItem(key2Label(SUMMARY_OBJECTIVE), SUMMARY_OBJECTIVE),
    getItem(key2Label(EMPLOYMENT_HISTORY), EMPLOYMENT_HISTORY),
    getItem(key2Label(SKILLS), SKILLS),
    getItem(key2Label(EDUCATION), EDUCATION),
  ]),

  getItem('Additional improvements', 'additional-improvement', null, [
    getItem(key2Label(REFERENCES), REFERENCES),
    getItem(key2Label(LANGUAGES), LANGUAGES),
    getItem(key2Label(PROOFREADING), PROOFREADING),
    getItem(key2Label(INTERNATIONAL_RESUMES), INTERNATIONAL_RESUMES),
  ]),
];

const BlogMenu: React.FC = () => {
  const [current, setCurrent] = useState(HOW_TO_WRITE_A_RESUME);

  const router = useRouter()

  const onClick: MenuProps['onClick'] = e => {
    setCurrent(e.key);
    router.push(`/blogs/${e.key}`)
  };

  return (
    <Menu
      onClick={onClick}
      style={{ height: '100%' }}
      defaultOpenKeys={['fundamentals']}
      selectedKeys={[current]}
      mode="inline"
      items={items}
    />
  );
};

export default BlogMenu;