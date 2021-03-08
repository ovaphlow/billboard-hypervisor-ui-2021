import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faMobileAlt } from '@fortawesome/free-solid-svg-icons';

export default function ComponentResume({ id, uuid }) {
  const [data, setData] = React.useState({});

  React.useEffect(() => {
    if (!id || !uuid) return;
    fetch(`/api/resume/user/${id}?u_id=${uuid}`)
      .then((response) => {
        if (response.status !== 200) throw new Error('服务器错误');
        else return response.json();
      })
      .then((data) => {
        console.info(data);
        setData(data);
      })
      .catch((err) => {
        console.error(err.stack);
      });
  }, [id, uuid]);

  return (
    <div className="card shadow bg-dark h-100 flex-grow-1">
      <div className="card-header">
        <span className="lead">简历</span>
      </div>

      <div className="card-body">
        <dl className="row">
          <dt className="col-3">姓名</dt>
          <dd className="col-9">{data.name}</dd>

          <dt className="col-3">性别</dt>
          <dd className="col-9">{data.gender}</dd>

          <dt className="col-3">出生日期</dt>
          <dd className="col-9">{data.birthday}</dd>

          <dt className="col-3">联系方式</dt>
          <dd className="col-9">
            <p>
              <FontAwesomeIcon icon={faMobileAlt} fixedWidth />
              {data.phone}
            </p>
            <p>
              <FontAwesomeIcon icon={faEnvelope} fixedWidth />
              {data.email}
            </p>
          </dd>

          <dt className="col-3">住址</dt>
          <dd className="col-9">
            <ul className="list-inline">
              <li className="list-inline-item">{data.address1}</li>
              <li className="list-inline-item">{data.address2}</li>
            </ul>
          </dd>

          <dt className="col-3">教育情况</dt>
          <dd className="col-9">
            <p>{data.date_begin + ' / ' + data.date_end}</p>
            <ul className="list-inline">
              <li className="list-inline-item">{data.school}</li>
              <li className="list-inline-item">{data.major}</li>
              <li className="list-inline-item">{data.education}</li>
            </ul>
          </dd>

          <dt className="col-3">自我评价</dt>
          <dd className="col-9" dangerouslySetInnerHTML={{ __html: data.ziwopingjia }} />

          <dt className="col-3">期望行业</dt>
          <dd className="col-9">{data.qiwanghangye}</dd>

          <dt className="col-3">期望职位</dt>
          <dd className="col-9">{data.qiwangzhiwei}</dd>

          <dt className="col-3">意向城市</dt>
          <dd className="col-9">{data.yixiangchengshi}</dd>

          <dt className="col-3">工作经历</dt>
          <dd className="col-9">{data.career}</dd>

          <dt className="col-3">项目经验</dt>
          <dd className="col-9">{data.record}</dd>
        </dl>
      </div>
    </div>
  );
}
