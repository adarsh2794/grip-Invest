import { inject, observer } from 'mobx-react';
import React from 'react';
import AddClient from './AddClient';

const Actions = inject("CRMStores", "UpdateStores")(observer((props) => {
  
  return (
    <div className='actionsContainer'>
    <AddClient />
    </div>
    )
  }))
  
  export default Actions;