// Copyright 2019 Google LLC
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
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.RequestDispatcher;

/** Servlet that returns some example content. TODO: modify this file to handle comments data */
@WebServlet("/*")
public class RouterServlet extends HttpServlet {

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
    String path = request.getRequestURI().substring(request.getContextPath().length());
    System.out.println("path");
    System.out.println(path);

    // RequestDispatcher view = request.getRequestDispatcher("/webapp/index.html");
    // view.forward(request, response);
    if (path.startsWith("/Query")) {
      //redirect to home page
      //doesn't send you to the same page you were on before you refresh
      response.sendRedirect("/");


      //this is me trying to load index.html
      // RequestDispatcher view = request.getRequestDispatcher("/");
      // view.forward(request, response);


      //serve some html
      //works fine, but we need to serve index.html
      // response.setContentType("text/html;");
      // response.getWriter().println("<h1>Hello world!</h1>");

    }

  }
}
