import axios from "../../utils/axios";

import { loadperson } from "../reducers/personSlice";
import { removeperson } from "../reducers/personSlice";

export const asyncloadperson = (id) => async (dispatch, getState) => {
  try {
    const detail = await axios.get(`/person/${id}`);
    // const recommendations = await axios.get(`/person/${id}/recommendations`);
    const externalid = await axios.get(`/person/${id}/external_ids`);
    const combinedCredits = await axios.get(`/person/${id}/combined_credits`);
    const movieCredits = await axios.get(`/person/${id}/movie_credits`);
    const tvCredits = await axios.get(`/person/${id}/tv_credits`);
    // const similar = await axios.get(`/person/${id}/similar`);
    // const videos = await axios.get(`/person/${id}/videos`);
    // const watchproviders = await axios.get(`/person/${id}/watch/providers`);
    // const detail = axios.get(`/person/${id}`);
    // const detail = axios.get(`/person/${id}`);

    let theultimatedetails = {
      detail: detail.data,
      combinedCredits: combinedCredits.data,
      movieCredits: movieCredits.data,
      tvCredits: tvCredits.data,
      externalid: externalid.data,

      // recommendations: recommendations.data,

      // similar: similar.data,
      // videos: videos.data,
      // watchproviders: watchproviders.data
    };
    dispatch(loadperson(theultimatedetails));
    // console.log(theultimatedetails);
  } catch (error) {
    console.log(error);
  }
};
