import React from 'react';
import PropTypes from 'prop-types';

export default function useMessageQty({ user_id, user_uuid }) {
  const [qty, setQty] = React.useState(0);

  React.useEffect(() => {
    if (user_id !== 0 && user_uuid) {
      window.console.info('useMessageQty');
    }
    // fetch('/api/enterprise/certificate/qty')
    fetch('/api/employer/statistic?option=hypervisor-certificate', {
      method: 'PUT',
    })
      .then((response) => {
        if (response.status !== 200) {
          throw new Error();
        } else return response.json();
      })
      .then((data) => {
        setQty((prev) => prev + data.qty);
      })
      .catch((err) => {
        window.console.error(err.stack);
      });
  }, [user_id, user_uuid]);

  return qty;
}

useMessageQty.propTypes = {
  user_id: PropTypes.number.isRequired,
  user_uuid: PropTypes.string.isRequred,
};
