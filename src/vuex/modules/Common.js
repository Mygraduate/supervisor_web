/*
 * @Author: Rhymedys
 * @Date:   2017-01-31 14:10:32
 * @Last Modified by:   Rhymedys
 * @Last Modified time: 2017-02-07 15:47:45

 *https://vuex.vuejs.org/zh-cn/intro.html
 */

'use strict';

import * as mMutations from '../Mutations';
import * as mGetters from '../Getters';
import * as mActions from '../Actions';
import commonUtils from '../../utils/CommonUtils'

import api from '../../utils/Api'



const state = {
	
};

const getters = {
	// [mGetters.GET_ALL_PLAYLIST]: function(state) {
	// 	commonUtils.log("--playlist module getters--", state.playlist);
	// 	return state.playlist;
	// }

};



const actions = {
	// [mActions.SET_AUDIO_DETAILS]({
	// 	commit,
	// 	state
	// }, res) {
	// 	commit(mMutations.SET_AUDIO_DETAILS, res)
	// }

}


const mutations = {
	// 
	// [mMutations.SET_AUDIO_DURATION](state, res) {
	// 	state.audioDuration = res.audioDuration;
	// }
};


export default {
	state,
	getters,
	actions,
	mutations
}
