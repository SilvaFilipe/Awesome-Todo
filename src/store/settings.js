import { LocalStorage } from "quasar";

const state = {
  settings: {
    show12HourFormat: false
  }
};

const mutations = {
  setShow12HourFormat(state, value) {
    state.settings.show12HourFormat = value;
  },
  setSettings(state, settings) {
    Object.assign(state.settings, settings);
  }
};

const actions = {
  setShow12HourFormat({ commit, dispatch }, value) {
    commit("setShow12HourFormat", value);
    dispatch("saveSettings");
  },
  saveSettings({ state }) {
    LocalStorage.set("settings", state.settings);
  },
  getSettings({ commit }) {
    let settings = LocalStorage.getItem("settings");
    if (settings) {
      commit("setSettings", settings);
    }
  }
};

const getters = {
  settings: state => {
    return state.settings;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
