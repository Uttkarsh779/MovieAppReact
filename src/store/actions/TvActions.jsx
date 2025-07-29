import axios from "../../utils/axios";

import { loadtv } from "../reducers/TvSlice";
import { removetv } from "../reducers/TvSlice";

export const asyncloadtv = (id) => async (dispatch, getState) => {
  try {
    const detail = await axios.get(`/tv/${id}`);
    const recommendations = await axios.get(`/tv/${id}/recommendations`);
    const externalid = await axios.get(`/tv/${id}/external_ids`);
    const similar = await axios.get(`/tv/${id}/similar`);
    const videos = await axios.get(`/tv/${id}/videos`);
    const watchproviders = await axios.get(`/tv/${id}/watch/providers`);
    // const detail = axios.get(`/tv/${id}`);
    // const detail = axios.get(`/tv/${id}`);

    let theultimatedetails = {
      detail: detail.data,
      recommendations: recommendations.data,
      externalid: externalid.data,
      similar: similar.data,
      videos: videos.data,
      watchproviders: watchproviders.data,
    };
    dispatch(loadtv(theultimatedetails));
    // console.log(theultimatedetails);
  } catch (error) {
    console.log(error);
  }
};
