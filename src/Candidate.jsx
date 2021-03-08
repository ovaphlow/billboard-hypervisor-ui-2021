import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faList } from '@fortawesome/free-solid-svg-icons';

import TopNav from './TopNav';
import LeftNav from './LeftNav';
import BottomNav from './BottomNav';
import { reducer, useAuth } from './miscellaneous';
import ComponentResume from './ComponentResume';

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

  return (
    <div className="d-flex flex-column min-vh-100 w-100">
      <header>
        <TopNav component_option="" component_param_name={auth.name} />
      </header>

      <main className="flex-grow-1">
        <div className="container-fluid">
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

                <div className="card shadow bg-dark h-100 mb-4">
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
                    <dl className="row">
                      <dt className="col-3">姓名</dt>
                      <dd className="col-9">{candidate.name}</dd>

                      <dt className="col-3">电话</dt>
                      <dd className="col-9">{candidate.phone}</dd>

                      <dt className="col-3">EMAIL</dt>
                      <dd className="col-9">{candidate.email}</dd>
                    </dl>
                  </div>
                </div>

                <ComponentResume id={id} uuid={uuid} />
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
