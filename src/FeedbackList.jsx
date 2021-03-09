import React from 'react';
import dayjs from 'dayjs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

import TopNav from './TopNav';
import LeftNav from './LeftNav';
import BottomNav from './BottomNav';
import { useAuth } from './miscellaneous';

export default function FeedbackList() {
  const [tag, setTag] = React.useState('投诉');
  const [complaint_list_candidate, setComplaintListCandidate] = React.useState([]);
  const [complaint_list_employer, setComplaintListEmployer] = React.useState([]);
  const [feedback_list_candidate, setFeedbackListCandidate] = React.useState([]);
  const [feedback_list_employer, setFeedbackListEmployer] = React.useState([]);
  const [flag, setFlag] = React.useState(false);
  const auth = useAuth();

  const handleChangeTab = (event) => {
    setTag(event.target.getAttribute('data-tag'));
  };

  const handleReply = async (event) => {
    const content = window.prompt('对投诉回复的内容');
    const response = await window.fetch('/api/feedback/complaint/reply', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        id: event.target.getAttribute('data-id'),
        user_id: event.target.getAttribute('data-user-id'),
        user_category: event.target.getAttribute('data-user-category'),
        category: '系统消息',
        title: '对用户投诉内容的回复',
        content,
        datime: dayjs().format('YYYY-MM-DD'),
      }),
    });
    const res = await response.json();
    if (res.message) {
      window.alert(res.message);
      return;
    }
    window.location.reload();
  };

  React.useEffect(() => {
    fetch('/api/miscellaneus/feedback/filter?option=hypervisor', {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        category: '',
        user_category: '用户',
        status: '未处理',
      }),
    })
      .then((response) => {
        if (response.status !== 200) throw new Error('服务器错误', response.status);
        else return response.json();
      })
      .then((data) => {
        let list1 = [],
          list2 = [],
          list3 = [],
          list4 = [];
        data.forEach((iter) => {
          if (iter.category === '投诉') {
            if (iter.user_category === '个人用户') list1.push(iter);
            else if (iter.user_category === '企业用户') list2.push(iter);
          } else if (iter.category === '意见反馈') {
            if (iter.user_category === '个人用户') list3.push(iter);
            else if (iter.user_category === '企业用户') list4.push(iter);
          }
        });
        setComplaintListCandidate(list1);
        setComplaintListEmployer(list2);
        setFeedbackListCandidate(list3);
        setFeedbackListEmployer(list4);
        setFlag(true);
      })
      .catch((err) => {
        console.error(err.stack);
      });
  }, [tag]);

  React.useEffect(() => {
    if (!flag) return;
    const list = complaint_list_candidate.map((iter) => iter.user_id);
    fetch('/api/candidate/filter?option=by-id-list', {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        list,
      }),
    })
      .then((response) => {
        if (response.status !== 200) throw new Error('服务器错误', response.status);
        else return response.json();
      })
      .then((data) => {
        const lf = complaint_list_candidate.map((current) => {
          const user = data.find((element) => element.id === current.user_id);
          return {
            ...current,
            user_name: '' || (user && user.name),
            user_email: '' || (user && user.email),
            user_phone: '' || (user && user.phone),
          };
        });
        setFlag(false);
        setComplaintListCandidate(lf);
      })
      .catch((err) => {
        console.error(err.stack);
      });
  }, [flag, feedback_list_candidate]);

  React.useEffect(() => {
    if (!flag) return;
    const list = complaint_list_employer.map((iter) => iter.user_id);
    fetch('/api/candidate/filter?option=by-id-list', {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        list,
      }),
    })
      .then((response) => {
        if (response.status !== 200) throw new Error('服务器错误', response.status);
        else return response.json();
      })
      .then((data) => {
        const lf = complaint_list_employer.map((current) => {
          const user = data.find((element) => element.id === current.user_id);
          return {
            ...current,
            user_name: '' || (user && user.name),
            user_email: '' || (user && user.email),
            user_phone: '' || (user && user.phone),
          };
        });
        setFlag(false);
        setComplaintListEmployer(lf);
      })
      .catch((err) => {
        console.error(err.stack);
      });
  }, [flag, feedback_list_candidate]);

  React.useEffect(() => {
    if (!flag) return;
    const list = feedback_list_candidate.map((iter) => iter.user_id);
    fetch('/api/candidate/filter?option=by-id-list', {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        list,
      }),
    })
      .then((response) => {
        if (response.status !== 200) throw new Error('服务器错误', response.status);
        else return response.json();
      })
      .then((data) => {
        const lf = feedback_list_candidate.map((current) => {
          const user = data.find((element) => element.id === current.user_id);
          return {
            ...current,
            user_name: '' || (user && user.name),
            user_email: '' || (user && user.email),
            user_phone: '' || (user && user.phone),
          };
        });
        setFlag(false);
        setFeedbackListCandidate(lf);
      })
      .catch((err) => {
        console.error(err.stack);
      });
  }, [flag, feedback_list_candidate]);

  React.useEffect(() => {
    if (!flag) return;
    const list = feedback_list_employer.map((iter) => iter.user_id);
    fetch('/api/employer/filter-user?option=by-id-list', {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        list,
      }),
    })
      .then((response) => {
        if (response.status !== 200) throw new Error('服务器错误', response.status);
        else return response.json();
      })
      .then((data) => {
        const lf = feedback_list_employer.map((current) => {
          const user = data.find((element) => element.id === current.user_id);
          return {
            ...current,
            user_name: '' || (user && user.name),
            user_email: '' || (user && user.email),
            user_phone: '' || (user && user.phone),
          };
        });
        setFlag(false);
        setFeedbackListEmployer(lf);
      })
      .catch((err) => {
        console.error(err.stack);
      });
  }, [flag, feedback_list_employer]);

  return (
    <div className="d-flex flex-column h-100 min-vh-100 w-100">
      <header>
        <TopNav component_option="" component_param_name={auth.name} />
      </header>

      <main className="flex-grow-1">
        <div className="container-fluid h-100">
          <div className="row h-100 d-flex justify-content-center">
            <div className="col-3 col-lg-2">
              <div className="card bg-dark h-100">
                <LeftNav component_option="投诉及意见反馈" />
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
                  <span className="h1">投诉及意见反馈</span>
                  <nav>
                    <ol className="breadcrumb transparent">
                      <li className="breadcrumb-item">
                        <a href="home.html" className="text-reset text-decoration-none">
                          首页
                        </a>
                      </li>
                      <li className="breadcrumb-item active">投诉及意见反馈</li>
                    </ol>
                  </nav>
                </div>

                <div className="card shadow bg-dark h-100 flex-grow-1">
                  <div className="card-body">
                    <ul className="nav nav-tabs">
                      <li className="nav-item">
                        <a
                          href="#投诉"
                          className={`nav-link${tag === '投诉' ? ' active' : ''}`}
                          data-tag="投诉"
                          onClick={handleChangeTab}
                        >
                          投诉
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          href="#意见反馈"
                          className={`nav-link${tag === '意见反馈' ? ' active' : ''}`}
                          data-tag="意见反馈"
                          onClick={handleChangeTab}
                        >
                          意见反馈
                        </a>
                      </li>
                    </ul>
                    {tag === '投诉' && (
                      <>
                        <h3 className="mt-2">个人用户投诉</h3>
                        <table className="table table-dark table-striped">
                          <caption>个人用户投诉</caption>
                          <thead>
                            <tr>
                              <th className="text-right">序号</th>
                              <th>状态</th>
                              <th>用户</th>
                              <th>时间</th>
                              <th>内容</th>
                              <th>&nbsp;</th>
                            </tr>
                          </thead>

                          <tbody>
                            {complaint_list_candidate.length > 0 &&
                              complaint_list_candidate.map((it) => (
                                <tr key={it.id}>
                                  <td className="text-right">{it.id}</td>
                                  <td>
                                    {it.status === '已处理' ? (
                                      <span className="badge bg-secondary">已处理</span>
                                    ) : (
                                      <span className="badge bg-danger">未处理</span>
                                    )}
                                  </td>
                                  <td>
                                    {it.user_category === '企业用户' && (
                                      <span className="badge bg-success">{it.user_category}</span>
                                    )}
                                    {it.user_category === '个人用户' && (
                                      <span className="badge bg-info">{it.user_category}</span>
                                    )}
                                    &nbsp;
                                    {it.user_name || ''}
                                    <br />
                                    <small className="text-muted">{it.user_phone || ''}</small>
                                  </td>
                                  <td>
                                    {dayjs(it.datime).format('YYYY-MM-DD')}
                                    <br />
                                    <small className="text-muted">
                                      {dayjs(it.datime).format('HH:mm')}
                                    </small>
                                  </td>
                                  <td>{it.content}</td>
                                  <td>
                                    <button
                                      type="button"
                                      className="btn btn-outline-success btn-sm"
                                      data-id={it.id}
                                      data-user-id={it.user_id}
                                      data-user-category={it.user_category}
                                      onClick={handleReply}
                                    >
                                      <FontAwesomeIcon icon={faEnvelope} fixedWidth size="lg" />
                                      回复
                                    </button>
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </table>

                        <hr />

                        <h3 className="mt-2">企业用户投诉</h3>
                        <table className="table table-dark table-striped">
                          <caption>企业用户投诉</caption>
                          <thead>
                            <tr>
                              <th className="text-right">序号</th>
                              <th>状态</th>
                              <th>用户</th>
                              <th>时间</th>
                              <th>内容</th>
                              <th>&nbsp;</th>
                            </tr>
                          </thead>

                          <tbody>
                            {complaint_list_employer.length > 0 &&
                              complaint_list_employer.map((it) => (
                                <tr key={it.id}>
                                  <td className="text-right">{it.id}</td>
                                  <td>
                                    {it.status === '已处理' ? (
                                      <span className="badge bg-secondary">已处理</span>
                                    ) : (
                                      <span className="badge bg-danger">未处理</span>
                                    )}
                                  </td>
                                  <td>
                                    {it.user_category === '企业用户' && (
                                      <span className="badge bg-success">{it.user_category}</span>
                                    )}
                                    {it.user_category === '个人用户' && (
                                      <span className="badge bg-info">{it.user_category}</span>
                                    )}
                                    &nbsp;
                                    {it.user_name || ''}
                                    <br />
                                    <small className="text-muted">{it.user_phone || ''}</small>
                                  </td>
                                  <td>
                                    {dayjs(it.datime).format('YYYY-MM-DD')}
                                    <br />
                                    <small className="text-muted">
                                      {dayjs(it.datime).format('HH:mm')}
                                    </small>
                                  </td>
                                  <td>{it.content}</td>
                                  <td>
                                    <button
                                      type="button"
                                      className="btn btn-outline-success btn-sm"
                                      data-id={it.id}
                                      data-user-id={it.user_id}
                                      data-user-category={it.user_category}
                                      onClick={handleReply}
                                    >
                                      <FontAwesomeIcon icon={faEnvelope} fixedWidth size="lg" />
                                      回复
                                    </button>
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </>
                    )}
                    {tag === '意见反馈' && (
                      <>
                        <h3 className="mt-2">个人用户意见反馈</h3>
                        <table className="table table-dark table-striped">
                          <caption>个人用户意见反馈</caption>
                          <thead>
                            <tr>
                              <th className="text-right">序号</th>
                              <th>状态</th>
                              <th>用户</th>
                              <th>时间</th>
                              <th>内容</th>
                              <th>&nbsp;</th>
                            </tr>
                          </thead>

                          <tbody>
                            {feedback_list_candidate.length > 0 &&
                              feedback_list_candidate.map((it) => (
                                <tr key={it.id}>
                                  <td className="text-right">{it.id}</td>
                                  <td>
                                    {it.status === '已处理' ? (
                                      <span className="badge bg-secondary">已处理</span>
                                    ) : (
                                      <span className="badge bg-danger">未处理</span>
                                    )}
                                  </td>
                                  <td>
                                    {it.user_category === '企业用户' && (
                                      <span className="badge bg-success">{it.user_category}</span>
                                    )}
                                    {it.user_category === '个人用户' && (
                                      <span className="badge bg-info">{it.user_category}</span>
                                    )}
                                    &nbsp;
                                    {it.user_name || ''}
                                    <br />
                                    <small className="text-muted">{it.user_phone || ''}</small>
                                  </td>
                                  <td>
                                    {dayjs(it.datime).format('YYYY-MM-DD')}
                                    <br />
                                    <small className="text-muted">
                                      {dayjs(it.datime).format('HH:mm')}
                                    </small>
                                  </td>
                                  <td>{it.content}</td>
                                  <td>
                                    <button
                                      type="button"
                                      className="btn btn-outline-success btn-sm"
                                      data-id={it.id}
                                      data-user-id={it.user_id}
                                      data-user-category={it.user_category}
                                      onClick={handleReply}
                                    >
                                      <FontAwesomeIcon icon={faEnvelope} fixedWidth size="lg" />
                                      回复
                                    </button>
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </table>

                        <hr />

                        <h3 className="mt-2">企业用户意见反馈</h3>
                        <table className="table table-dark table-striped">
                          <caption>企业用户意见反馈</caption>
                          <thead>
                            <tr>
                              <th className="text-right">序号</th>
                              <th>状态</th>
                              <th>用户</th>
                              <th>时间</th>
                              <th>内容</th>
                              <th>&nbsp;</th>
                            </tr>
                          </thead>

                          <tbody>
                            {feedback_list_employer.length > 0 &&
                              feedback_list_employer.map((it) => (
                                <tr key={it.id}>
                                  <td className="text-right">{it.id}</td>
                                  <td>
                                    {it.status === '已处理' ? (
                                      <span className="badge bg-secondary">已处理</span>
                                    ) : (
                                      <span className="badge bg-danger">未处理</span>
                                    )}
                                  </td>
                                  <td>
                                    {it.user_category === '企业用户' && (
                                      <span className="badge bg-success">{it.user_category}</span>
                                    )}
                                    {it.user_category === '个人用户' && (
                                      <span className="badge bg-info">{it.user_category}</span>
                                    )}
                                    &nbsp;
                                    {it.user_name || ''}
                                    <br />
                                    <small className="text-muted">{it.user_phone || ''}</small>
                                  </td>
                                  <td>
                                    {dayjs(it.datime).format('YYYY-MM-DD')}
                                    <br />
                                    <small className="text-muted">
                                      {dayjs(it.datime).format('HH:mm')}
                                    </small>
                                  </td>
                                  <td>{it.content}</td>
                                  <td>
                                    <button
                                      type="button"
                                      className="btn btn-outline-success btn-sm"
                                      data-id={it.id}
                                      data-user-id={it.user_id}
                                      data-user-category={it.user_category}
                                      onClick={handleReply}
                                    >
                                      <FontAwesomeIcon icon={faEnvelope} fixedWidth size="lg" />
                                      回复
                                    </button>
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </>
                    )}
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
