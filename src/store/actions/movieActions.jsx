import axios from "../../utils/axios";

import { loadmovie } from "../reducers/movieSlice";
import { removemovie } from "../reducers/movieSlice";

export const asyncloadmovie = (id) => async (dispatch, getState) => {
  try {
    const detail = await axios.get(`/movie/${id}`);
    const recommendations = await axios.get(`/movie/${id}/recommendations`);
    const externalid = await axios.get(`/movie/${id}/external_ids`);
    const similar = await axios.get(`/movie/${id}/similar`);
    const videos = await axios.get(`/movie/${id}/videos`);
    const watchproviders = await axios.get(`/movie/${id}/watch/providers`);
    // const detail = axios.get(`/movie/${id}`);
    // const detail = axios.get(`/movie/${id}`);

    let theultimatedetails = {
      detail: detail.data,
      recommendations: recommendations.data,
      externalid: externalid.data,
      similar: similar.data,
      videos: videos.data,
      watchproviders: watchproviders.data,
    };
    dispatch(loadmovie(theultimatedetails));
    // console.log(theultimatedetails);
  } catch (error) {
    console.log(error);
  }
};
