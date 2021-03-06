import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faSyncAlt } from '@fortawesome/free-solid-svg-icons';

import TopNav from './TopNav';
import LeftNav from './LeftNav';
import BottomNav from './BottomNav';
import { useAuth, useMessageQty } from './miscellaneous';

export default function EmployerList() {
  const auth = useAuth();
  const message_qty = useMessageQty({ user_id: 0, user_uuid: '' });
  const [list, setList] = useState([]);
  const [keyword, setKeyword] = useState('');

  const handleFilter = async () => {
    setList([]);
    fetch('/api/employer/filter?option=hypervisor', {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        keyword,
      }),
    })
      .then((response) => {
        if (response.status !== 200) throw new Error('服务器错误');
        else return response.json();
      })
      .then((data) => {
        setList(data);
      })
      .catch((err) => {
        console.error(err.stack);
      });
  };

  return (
    <div className="d-flex flex-column h-100 w-100">
      <header>
        <TopNav component_option="" component_param_name={auth.name} />
      </header>

      <main className="flex-grow-1">
        <div className="container-fluid h-100">
          <div className="row h-100 d-flex justify-content-center">
            <div className="col-3 col-lg-2">
              <div className="card bg-dark h-100">
                <LeftNav component_option="企业用户" />
              </div>
            </div>

            <div className="col">
              <div className="container-lg h-100 d-flex flex-column">
                <div className="d-flex justify-content-between align-items-end">
                  <div className="btn-group">
                    <button
                      type="button"
                      className="btn btn-link text-reset text-decoration-none"
                      onClick={() => {
                        window.history.go(-1);
                      }}
                    >
                      返回
                    </button>
                  </div>
                  <span className="h1">企业用户</span>
                  <nav>
                    <ol className="breadcrumb transparent">
                      <li className="breadcrumb-item">
                        <a href="home.html" className="text-reset text-decoration-none">
                          首页
                        </a>
                      </li>
                      <li className="breadcrumb-item active">企业用户</li>
                    </ol>
                  </nav>
                </div>

                {parseInt(message_qty) > 0 && (
                  <div className="alert alert-warning">
                    有 {message_qty} 个待认证企业需要
                    <Link to="/current-user/待处理">处理</Link>。
                  </div>
                )}

                <div className="card shadow bg-dark h-100 flex-grow-1">
                  <div className="card-header">
                    <div className="row">
                      <div className="col">
                        <div className="input-group">
                          <div className="input-group-prepend">
                            <span className="input-group-text">名称/电话</span>
                          </div>
                          <input
                            type="text"
                            value={keyword}
                            className="form-control"
                            onChange={(event) => setKeyword(event.target.value)}
                          />
                        </div>
                      </div>

                      <div className="btn-group col-auto">
                        <button type="button" className="btn btn-info" onClick={handleFilter}>
                          <FontAwesomeIcon icon={faSearch} fixedWidth size="lg" />
                          查询
                        </button>

                        <button
                          type="button"
                          className="btn btn-secondary"
                          onClick={() => {
                            window.location.reload();
                          }}
                        >
                          <FontAwesomeIcon icon={faSyncAlt} fixedWidth size="lg" />
                          重置
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="card-body">
                    <table className="table table-dark table-striped">
                      <caption>企业用户</caption>
                      <thead>
                        <tr>
                          <th className="text-right">序号</th>
                          <th>企业</th>
                          <th>电话</th>
                          <th>操作</th>
                        </tr>
                      </thead>

                      <tbody>
                        {list.map((it) => (
                          <tr key={it.id}>
                            <td className="text-right">{it.id}</td>
                            <td>{it.name}</td>
                            <td>{it.phone}</td>
                            <td>
                              <a href={`#/${it.id}?uuid=${it.uuid}`} className="float-left">
                                企业用户
                              </a>
                              &nbsp;/&nbsp;
                              <a
                                href={`enterprise.html#/${it.enterprise_id}?uuid=${it.enterprise_uuid}`}
                              >
                                信息
                              </a>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="mt-3 bg-dark">
        <BottomNav />
      </footer>
    </div>
  );
}
