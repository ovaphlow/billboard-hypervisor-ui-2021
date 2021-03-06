import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearch,
  faSyncAlt,
  faEdit,
  faEnvelope,
  faMobileAlt,
} from '@fortawesome/free-solid-svg-icons';

import TopNav from './TopNav';
import LeftNav from './LeftNav';
import BottomNav from './BottomNav';
import { useAuth } from './miscellaneous';

export default function CandidateList() {
  const auth = useAuth();
  const [data, setData] = React.useState([]);
  const [keyword, setKeyword] = React.useState('');

  const handleFilter = async () => {
    setData([]);
    fetch('/api/candidate/filter?option=hypervisor', {
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
        setData(data);
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
                <LeftNav component_option="个人用户" />
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
                        window.history.back();
                      }}
                    >
                      返回
                    </button>
                  </div>
                  <span className="h1">个人用户</span>
                  <nav>
                    <ol className="breadcrumb transparent">
                      <li className="breadcrumb-item">
                        <Link to="/" className="text-reset text-decoration-none">
                          首页
                        </Link>
                      </li>
                      <li className="breadcrumb-item active">个人用户</li>
                    </ol>
                  </nav>
                </div>

                <div className="card shadow bg-dark h-100 flex-grow-1">
                  <div className="card-header">
                    <div className="row">
                      <div className="col">
                        <div className="input-group">
                          <div className="input-group-prepend">
                            <span className="input-group-text">姓名/电话</span>
                          </div>

                          <input
                            type="text"
                            value={keyword}
                            aria-label="企业名称"
                            className="form-control"
                            onChange={(event) => setKeyword(event.target.value)}
                          />
                        </div>
                      </div>

                      <div className="col-auto">
                        <div className="btn-group">
                          <button type="button" className="btn btn-info" onClick={handleFilter}>
                            <FontAwesomeIcon icon={faSearch} fixedWidth size="lg" />
                            查询
                          </button>

                          <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => {
                              window.reload(true);
                            }}
                          >
                            <FontAwesomeIcon icon={faSyncAlt} fixedWidth size="lg" />
                            重置
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="card-body table-responsive">
                    <table className="table table-dark table-striped">
                      <thead>
                        <tr>
                          <th className="text-right">序号</th>
                          <th>用户</th>
                          <th>EMAIL</th>
                          <th>电话</th>
                        </tr>
                      </thead>

                      <tbody>
                        {data.map((it) => (
                          <tr key={it.id}>
                            <td className="text-right">
                              <Link
                                to={`/candidate/${it.id}?uuid=${it.uuid}`}
                                className="float-left"
                              >
                                <FontAwesomeIcon icon={faEdit} fixedWidth size="lg" />
                              </Link>
                              <span className="float-right">{it.id}</span>
                            </td>
                            <td>{it.name}</td>
                            <td>
                              <FontAwesomeIcon icon={faEnvelope} fixedWidth size="lg" />
                              {it.email}
                            </td>
                            <td>
                              <FontAwesomeIcon icon={faMobileAlt} fixedWidth size="lg" />
                              {it.phone}
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
