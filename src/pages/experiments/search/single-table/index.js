import React from 'react';
import { connect } from 'react-redux';

import ExperimentLink from '../../../experiment/link';
import Clickable from '../../../../components/clickable';
import TableComponent from '../../../../components/table';
import { selectExperiment } from '../../../../actions/experiments';

import { ReactComponent as RadioedIcon } from '../../../../images/radioed.svg';
import { ReactComponent as UnradioedIcon } from '../../../../images/unradioed.svg';

import './index.css';

// single search result table

let Table = ({ results, highlightedIndex, select }) => {
  return (
    <TableComponent
      data={results}
      columns={[
        {
          name: ' ',
          width: '30px',
          padded: false,
          render: (cell) => (
            <Clickable
              icon={cell.selected ? <RadioedIcon /> : <UnradioedIcon />}
              button
              onClick={() => select({ accession: cell.accession })}
              aria-label='Select this experiment'
            />
          )
        },
        {
          name: 'Accession',
          value: 'accession',
          width: 'calc((100% - 30px) * 0.25)',
          render: (cell) => <ExperimentLink experiment={cell} />
        },
        {
          name: 'Samples',
          value: (row) => row?.samples?.length,
          width: 'calc((100% - 30px) * 0.15)',
          align: 'center'
        },
        {
          name: 'Name',
          value: 'name',
          width: 'calc((100% - 30px) * 0.6)'
        }
      ]}
      highlightedIndex={highlightedIndex}
      sortable={false}
    />
  );
};

const mapDispatchToProps = (dispatch) => ({
  select: (...args) => dispatch(selectExperiment(...args))
});

Table = connect(null, mapDispatchToProps)(Table);

export default Table;
