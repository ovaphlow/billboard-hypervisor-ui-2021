import React from 'react';
import dayjs from 'dayjs';

import TopNav from './TopNav';
import LeftNav from './LeftNav';
import BottomNav from './BottomNav';
import { reducer, useAuth } from './miscellaneous';

const initial_state = {
  candidate_today: 0,
  candidate_all: 0,
  candidate_send: 0,
  employer_today: 0,
  employer_all: 0,
  employer_job: 0,
  bulletin_tuijian_today: 0,
  bulletin_tuijian_all: 0,
};

export default function Home() {
  const auth = useAuth();
  const [state, dispatch] = React.useReducer(reducer, initial_state);

  React.useEffect(() => {
    fetch('/api/candidate/statistic?option=hypervisor-today', {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ date: dayjs().format('YYYY-MM-DD') }),
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch({
          type: 'set',
          payload: { key: 'candidate_today', value: data.qty },
        });
      });
  }, []);

  React.useEffect(() => {
    fetch('/api/candidate/statistic?option=hypervisor-all', {
      method: 'PUT',
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch({
          type: 'set',
          payload: { key: 'candidate_all', value: 200000 + data.qty },
        });
      });
  }, []);

  React.useEffect(() => {
    fetch('/api/employer/statistic?option=hypervisor-today', {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ date: dayjs().format('YYYY-MM-DD') }),
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch({
          type: 'set',
          payload: { key: 'employer_today', value: data.qty },
        });
      });
  }, []);

  React.useEffect(() => {
    fetch('/api/employer/statistic?option=hypervisor-all', {
      method: 'PUT',
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch({
          type: 'set',
          payload: { key: 'employer_all', value: 60000 + data.qty },
        });
      });
  }, []);

  React.useEffect(() => {
    fetch('/api/send-in/statistic?option=hypervisor-all', {
      method: 'PUT',
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch({
          type: 'set',
          payload: { key: 'candidate_send', value: 180018 + data.qty },
        });
      });
  }, []);

  React.useEffect(() => {
    fetch('/api/job/statistic?option=hypervisor-all', {
      method: 'PUT',
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch({
          type: 'set',
          payload: { key: 'employer_job', value: data.qty },
        });
      });
  }, []);

  React.useEffect(() => {
    fetch('/api/bulletin/notification/statistic?option=hypervisor-today', {
      method: 'PUT',
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch({
          type: 'set',
          payload: { key: 'bulletin_tuijian_today', value: data.qty },
        });
      });
  }, []);

  React.useEffect(() => {
    fetch('/api/bulletin/notification/statistic?option=hypervisor-all', {
      method: 'PUT',
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch({
          type: 'set',
          payload: { key: 'bulletin_tuijian_all', value: data.qty },
        });
      });
  }, []);

  return (
    <div className="d-flex flex-column h-100 w-100">
      <header>
        <TopNav component_option="首页" component_param_name={auth.name} />
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
                  <span className="h1">首页</span>
                  <nav>
                    <ol className="breadcrumb transparent">
                      <li className="breadcrumb-item active">首页</li>
                    </ol>
                  </nav>
                </div>

                <div className="row">
                  <div className="col">
                    <div className="card bg-dark shadow">
                      <div className="card-body">
                        <p className="lead">用户 - 今日新增 / 总计</p>
                        <h1 className="display-1 text-center">
                          {state.candidate_today}
                          <hr />
                          {state.candidate_all}
                        </h1>
                      </div>
                    </div>
                  </div>

                  <div className="col">
                    <div className="card bg-dark shadow">
                      <div className="card-body">
                        <p className="lead">简历投递次数 / 岗位</p>
                        <h1 className="display-1 text-center">
                          {state.candidate_send}
                          <hr />
                          {state.employer_job}
                        </h1>
                      </div>
                    </div>
                  </div>

                  <div className="col">
                    <div className="card bg-dark shadow">
                      <div className="card-body">
                        <p className="lead">企业 - 今日新增 / 总计</p>
                        <h1 className="display-1 text-center">
                          {state.employer_today}
                          <hr />
                          {state.employer_all}
                        </h1>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row mt-4 d-flex justify-content-center">
                  <div className="col-4">
                    <div className="card bg-dark shadow">
                      <div className="card-body">
                        <p className="lead">推荐信息 - 今日新增 / 总计</p>
                        <h1 className="display-1 text-center">
                          {state.bulletin_tuijian_today}
                          <hr />
                          {state.bulletin_tuijian_all}
                        </h1>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="mt-4 bg-dark">
        <BottomNav />
      </footer>
    </div>
  );
}
