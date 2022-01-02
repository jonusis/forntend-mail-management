import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Route, Routes, Link, useLocation } from 'react-router-dom';
import { Breadcrumb, Alert } from 'antd';


export default function Breadcrumbss(){
  const location = useLocation();
  const pathSnippets = location.pathname.split('/').filter(i => i);
  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
    const strurl = url.substr(url.lastIndexOf('/') + 1,url.length);
    return (
      <Breadcrumb.Item key={url}>
        <Link to={url}>{strurl}</Link>
      </Breadcrumb.Item>
    );
  });
  const breadcrumbItems = [
    <Breadcrumb.Item key="home">
      <Link to="/">Home</Link>
    </Breadcrumb.Item>,
  ].concat(extraBreadcrumbItems);
  return (
    <Breadcrumb style={{ margin: '16px 0' }}>
      {breadcrumbItems}
      </Breadcrumb>
  );
};