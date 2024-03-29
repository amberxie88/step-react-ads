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
import java.io.FileNotFoundException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;



import com.google.sps.data.DatastoreRetrieval;


@WebServlet("/logout")
public class LogoutServlet extends HttpServlet {

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    String sessionId = (String) request.getSession().getId();
    DatastoreRetrieval.removeEntityFromDatastore("OAuth", sessionId);
    DatastoreRetrieval.removeEntityFromDatastore("Refresh", sessionId);

    response.setContentType("text/html;");
    response.getWriter().println("Logged out successfully!");
  }

} 