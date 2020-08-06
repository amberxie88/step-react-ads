// Copyright 2020 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package com.google.sps.servlets;

import java.io.IOException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/** Servlet that returns some example content. TODO: modify this file to handle comments data */
@WebServlet("/data")
public class DataServlet extends HttpServlet {

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    response.setContentType("application/json;");
    response.setCharacterEncoding("UTF-8");
    response.getWriter().println("{\"response\":[{\"campaign.name\":\"Sales-Search-1\",\"metrics.clicks\":\"3\"},{\"campaign.name\":\"Sales-Search-2\",\"metrics.clicks\":\"10\"},{\"campaign.name\":\"Sales-Search-3\",\"metrics.clicks\":\"1\"},{\"campaign.name\":\"Sales-Search-4\",\"metrics.clicks\":\"6\"}],\"meta\":{\"status\":\"200\"}}");
  }
}
