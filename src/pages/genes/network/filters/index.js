import React from 'react';
import { connect } from 'react-redux';

import Slider from '../../../../components/slider';

import { ReactComponent as GeneIcon } from '../../../../images/gene.svg';
import { ReactComponent as LinkIcon } from '../../../../images/link.svg';

import './index.css';

// filter controls above gene network graph

let Filters = ({
  minEdgeWeightCutoff,
  selectedNodes,
  filteredNodes,
  filteredLinks,
  fullNodes,
  fullLinks,
  nodeCutoff,
  setNodeCutoff,
  edgeWeightCutoff,
  setEdgeWeightCutoff
}) => (
  <>
    <Slider
      title='Node cutoff'
      value={nodeCutoff}
      min={selectedNodes}
      max={fullNodes}
      step={1}
      onChange={setNodeCutoff}
    />
    <Slider
      title='Edge weight cutoff'
      value={edgeWeightCutoff}
      min={minEdgeWeightCutoff}
      max={1}
      step={0.01}
      reverse
      onChange={setEdgeWeightCutoff}
      precision={2}
    />
    <div className='gene_network_info medium'>
      <span
        aria-label={
          'Showing ' + filteredNodes + ' of ' + fullNodes + ' nodes (genes)'
        }
      >
        <GeneIcon />
        {filteredNodes} of {fullNodes}
      </span>
      <span
        aria-label={
          'Showing ' + filteredLinks + ' of ' + fullLinks + ' edges (links)'
        }
      >
        <LinkIcon />
        {filteredLinks} of {fullLinks}
      </span>
    </div>
  </>
);

const mapStateToProps = (state) => ({
  minEdgeWeightCutoff:
    (state.model.list.find((model) => state.model.selected === model.id) || {})
      .g2gEdgeCutoff || 0
});

Filters = connect(mapStateToProps)(Filters);

export default Filters;
