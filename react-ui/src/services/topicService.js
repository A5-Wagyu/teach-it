import React from 'react';
import Axios from "axios";

export const getTopics = async () => {
  const url = "/topics";
  let results = await Axios.get(url);
  return results;
}

