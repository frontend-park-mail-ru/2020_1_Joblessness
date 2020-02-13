import x from '../vars'
import { updateDom } from '../UpdateDom'
import {updateHostComponent, updateFunctionComponent} from '../UpdateComponent'

import { commitRoot } from './commitRoot'

import { commitWork } from './commitWork'

import { commitDeletion } from './commitDeletion'

import { workLoop } from './workLoop'

import { performUnitOfWork } from './performUnitOfWork'

export {
  commitDeletion,
  commitRoot,
  commitWork,
  workLoop,
  performUnitOfWork,
}