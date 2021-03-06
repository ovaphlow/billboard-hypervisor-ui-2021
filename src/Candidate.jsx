import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList } from '@fortawesome/free-solid-svg-icons';

import TopNav from './TopNav';
import LeftNav from './LeftNav';
import BottomNav from './BottomNav';
import { reducer, useAuth } from './miscellaneous';

const initial_candidate = {
  id: 0,
  uuid: '',
  name: '',
  email: '',
  phone: '',
};

export default function Candidate() {
  const [candidate, dispatch] = React.useReducer(reducer, initial_candidate);
  const auth = useAuth();
  const { id } = useParams();
  const location = useLocation();
  const [uuid, setUUID] = React.useState('');
  const [resume_list, setResumeList] = React.useState([]);

  React.useEffect(() => {
    setUUID(new URLSearchParams(location.search).get('uuid'));
  }, [location.search]);

  React.useEffect(() => {
    if (!id || !uuid) return;
    fetch(`/api/candidate/${id}?uuid=${uuid}`)
      .then((response) => {
        if (response.status !== 200) throw new Error('服务器错误', response);
        else return response.json();
      })
      .then((data) => {
        dispatch({ type: 'set', payload: { key: 'id', value: data.id } });
        dispatch({ type: 'set', payload: { key: 'uuid', value: data.uuid } });
        dispatch({ type: 'set', payload: { key: 'name', value: data.name } });
        dispatch({ type: 'set', payload: { key: 'email', value: data.email } });
        dispatch({ type: 'set', payload: { key: 'phone', value: data.phone } });
      });
  }, [id, uuid]);

  React.useEffect(() => {
    if (!id || !uuid) return;
    fetch(`/api/resume/user/${id}?u_id=${uuid}`)
      .then((response) => {
        if (response.status !== 200) throw new Error('服务器错误');
        else return response.json();
      })
      .then((data) => {
        console.info(data);
      })
      .catch((err) => {
        console.error(err.stack);
      });
  }, [id, uuid]);

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
                <LeftNav component_option="个人用户" />
              </div>
            </div>

            <div className="col">
              <div className="container-lg d-flex flex-column">
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
                  <span className="h1">个人用户</span>
                  <nav>
                    <ol className="breadcrumb transparent">
                      <li className="breadcrumb-item">
                        <a href="home.html" className="text-reset text-decoration-none">
                          首页
                        </a>
                      </li>
                      <li className="breadcrumb-item">
                        <a href="common-user.html" className="text-reset text-decoration-none">
                          个人用户
                        </a>
                      </li>
                      <li className="breadcrumb-item active">
                        {candidate.name} ({id})
                      </li>
                    </ol>
                  </nav>
                </div>

                <div className="card shadow bg-dark h-100">
                  <div className="card-header d-flex justify-content-between">
                    <span className="lead">用户信息</span>
                    <div className="btn-group float-right">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => {
                          window.location = `favorite.html#/?master_id=${id}`;
                        }}
                      >
                        用户收藏
                      </button>

                      <button
                        type="button"
                        className="btn btn-warning"
                        onClick={() => {
                          window.location = `journal.html#/登录?user_category=个人用户&user_id=${id}&user_uuid=${uuid}`;
                        }}
                      >
                        登录记录
                      </button>

                      <button
                        type="button"
                        className="btn btn-info"
                        onClick={() => {
                          window.location = `journal.html#/浏览?user_category=个人用户&user_id=${id}&user_uuid=${uuid}`;
                        }}
                      >
                        浏览记录
                      </button>

                      <button
                        type="button"
                        className="btn btn-success"
                        onClick={() => {
                          window.location = `journal.html#/编辑?user_category=个人用户&user_id=${id}&user_uuid=${uuid}`;
                        }}
                      >
                        编辑记录
                      </button>
                    </div>
                  </div>

                  <div className="card-body">
                    <div className="row">
                      <div className="col">
                        <div className="mb-3">
                          <label className="form-label">姓名</label>
                          <input
                            type="text"
                            value={candidate.name}
                            className="form-control input-underscore"
                            onChange={(event) =>
                              dispatch({
                                type: 'set',
                                payload: { key: 'name', value: event.target.value },
                              })
                            }
                          />
                        </div>
                      </div>

                      <div className="col">
                        <div className="mb-3">
                          <label className="form-label">电话</label>
                          <input
                            type="tel"
                            value={candidate.phone}
                            className="form-control input-underscore"
                            onChange={(event) => {
                              dispatch({
                                type: 'set',
                                payload: { key: 'phone', value: event.target.value },
                              });
                            }}
                          />
                        </div>
                      </div>

                      <div className="col-6">
                        <div className="mb-3">
                          <label className="form-label">EMAIL</label>
                          <input
                            type="email"
                            value={candidate.email}
                            className="form-control input-underscore"
                            onChange={(event) => {
                              dispatch({
                                type: 'set',
                                payload: { key: 'email', value: event.target.value },
                              });
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card bg-dark shadow mt-3">
                  <div className="card-header">
                    <span className="lead">用户简历</span>
                  </div>

                  <div className="card-body">
                    <div className="list-group">
                      {resume_list.map((it) => (
                        <a
                          href={`resume.html#/${it.id}?master_id=${id}&uuid=${it.uuid}`}
                          className="list-group-item list-group-item-action"
                          key={it.id}
                        >
                          {it.qiwangzhiwei}
                          <span className="float-right text-muted">{it.yixiangchengshi}</span>
                        </a>
                      ))}
                    </div>
                  </div>

                  <div className="card-footer text-center">
                    <div className="btn-group">
                      <button
                        type="button"
                        className="btn btn-sm btn-info"
                        onClick={() => {
                          window.location = `delivery.html#/?user_id=${id}&user_uuid=${uuid}`;
                        }}
                      >
                        <FontAwesomeIcon icon={faList} fixedWidth size="lg" />
                        投递记录
                      </button>
                    </div>
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
