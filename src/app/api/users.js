/**
 * Author: Isamu Isozaki
 */
import api from './index';

/**
 * 
 * @param {object} param0
 * Get current user 
 */
export function getCurrentUser({params} = {}) {
  return api.get('/v1/user/me', {params});
}

/**
 * 
 * @param {object} user. data to update can be 
 * name: string. User name
 * email: string, Mail address id
 * translationLoc: string. Must be one of [top, bottom, only]
 * type: string. Must be one of [free, admin, user]
 * lang: string. Must be in ['ja', 'ko', 'zh-CN', 'zh-TW', 'en']
 * textBeforeOriginal: string. The text before the original text
 * textBeforeTranslated: string. The text to put before the translated text
 * Updae current user
 */
export function putCurrentUser(user) {
  return api.put('/v1/user/me', {user});
}
