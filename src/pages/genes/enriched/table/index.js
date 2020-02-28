import React from 'react';
import { Fragment } from 'react';
import { connect } from 'react-redux';

import TableComponent from '../../../../components/table';
import SignatureLink from '../../../signature/link';
import GeneLink from '../../../gene/link';

import './index.css';

// table of enriched signatures for selected genes

let Table = ({ enrichedSignatures }) => (
  <TableComponent
    data={enrichedSignatures}
    columns={[
      {
        name: 'Name',
        value: 'name',
        width: '25%',
        render: (cell) => <SignatureLink signature={cell} />
      },
      {
        name: 'Overlapping Genes',
        value: (cell) => cell.genes.map((gene) => gene.name).join(' '),
        width: '50%',
        render: (cell) =>
          cell.genes.map((gene, index) => (
            <Fragment key={index}>
              <GeneLink gene={gene} />
              &nbsp;
            </Fragment>
          ))
      },
      {
        name: 'p-value',
        value: (cell) => cell.pValue.toFixed(8),
        width: '25%',
        align: 'center'
      }
    ]}
    defaultSort={[{ id: 'pValue', desc: false }]}
    freeze={false}
  />
);

const mapStateToProps = (state) => ({
  enrichedSignatures: state.gene.enrichedSignatures.map((signature) => ({
    id: signature.id,
    name: signature.name,
    genes: signature.selectedParticipatingGenes,
    pValue: signature.pValue
  }))
});

Table = connect(mapStateToProps)(Table);

export default Table;
