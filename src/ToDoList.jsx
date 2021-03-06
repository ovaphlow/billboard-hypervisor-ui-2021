import React from 'react';
import { Link } from 'react-router-dom';

import TopNav from './TopNav';
import LeftNav from './LeftNav';
import BottomNav from './BottomNav';
import ComponentCertificateList from './ComponentCertificateList';
import { useAuth } from './miscellaneous';

export default function ToDoList() {
  const auth = useAuth();
  const [certificate_qty, setCertificateQty] = React.useState(0);

  React.useEffect(() => {
    fetch('/api/employer/statistic?option=hypervisor-certificate', {
      method: 'PUT',
    })
      .then((response) => {
        if (response.status !== 200) {
          throw new Error();
        } else return response.json();
      })
      .then((data) => {
        setCertificateQty(data.qty);
      })
      .catch((err) => {
        window.console.error(err.stack);
      });
  }, []);

  return (
    <div className="d-flex flex-column h-100 w-100">
      <header>
        <TopNav component_option="待处理任务" component_param_name={auth.name} />
      </header>

      <main className="flex-grow-1">
        <div className="container-fluid h-100">
          <div className="row h-100 d-flex justify-content-center">
            <div className="col-3 col-lg-2">
              <div className="card bg-dark h-100">
                <LeftNav component_option="" />
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
                  <span className="h1">待处理任务</span>
                  <nav>
                    <ol className="breadcrumb transparent">
                      <li className="breadcrumb-item">
                        <Link to="/" className="text-reset text-decoration-none">
                          首页
                        </Link>
                      </li>
                      <li className="breadcrumb-item">
                        <a href="/current-user" className="text-reset text-decoration-none">
                          当前用户
                        </a>
                      </li>
                      <li className="breadcrumb-item active">待处理任务</li>
                    </ol>
                  </nav>
                </div>

                {certificate_qty > 0 && (
                  <div className="mt-3 flex-grow-1">
                    <h2 className="text-center">待认证企业</h2>
                    <ComponentCertificateList />
                  </div>
                )}
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
