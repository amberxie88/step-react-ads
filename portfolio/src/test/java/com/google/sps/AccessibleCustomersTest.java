 
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

package com.google.sps;

import java.io.*;
import java.util.ArrayList;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;

import static org.mockito.Mockito.*;
import org.powermock.api.mockito.PowerMockito.*;
import org.powermock.modules.junit4.PowerMockRunner;
import org.powermock.core.classloader.annotations.PrepareForTest;
import org.powermock.core.classloader.annotations.PowerMockIgnore;

import com.google.ads.googleads.v3.resources.CustomerClient;
import com.google.protobuf.Int64Value;

import com.google.common.collect.ArrayListMultimap;
import com.google.common.collect.Multimap;

import com.google.sps.MockAccessibleCustomersServlet;

@PowerMockIgnore("jdk.internal.reflect.*")
@RunWith(PowerMockRunner.class)
@PrepareForTest({CustomerClient.class, Int64Value.class})
public final class AccessibleCustomersTest {

	private static final CustomerClient CCMOCK0 = createCustomerClientMock(0L);
	private static final CustomerClient CCMOCK1 = createCustomerClientMock(1L);
	private static final CustomerClient CCMOCK2 = createCustomerClientMock(2L);
	private static final CustomerClient CCMOCK3 = createCustomerClientMock(3L);
	private static final CustomerClient CCMOCK4 = createCustomerClientMock(4L);

	//test two-level hierachy
	@Test
	public void buildAccountHierarchy2() {
		MockAccessibleCustomersServlet testServlet = new MockAccessibleCustomersServlet();
		ArrayList<CustomerClient> output = new ArrayList<>();
		ArrayList<CustomerClient> expected = new ArrayList<>();
		expected.add(CCMOCK1);
		expected.add(CCMOCK2);
		expected.add(CCMOCK3);

		//Multimap: {[0: 1, 2, 3]}
		Multimap<Long, CustomerClient> customerIdsToChildAccounts = ArrayListMultimap.create();
		customerIdsToChildAccounts.put(0L, CCMOCK1);
		customerIdsToChildAccounts.put(0L, CCMOCK2);
		customerIdsToChildAccounts.put(0L, CCMOCK3);

		testServlet.buildAccountHierarchy(CCMOCK0, customerIdsToChildAccounts, 0, output);
		Assert.assertEquals(expected, output);
	}

	//test single-level hierachy
	@Test
	public void buildAccountHierarchy1() {
		MockAccessibleCustomersServlet testServlet = new MockAccessibleCustomersServlet();
		ArrayList<CustomerClient> output = new ArrayList<>();
		ArrayList<CustomerClient> expected = new ArrayList<>();

		//Multimap: {[]}
		Multimap<Long, CustomerClient> customerIdsToChildAccounts = ArrayListMultimap.create();

		testServlet.buildAccountHierarchy(CCMOCK0, customerIdsToChildAccounts, 0, output);
		Assert.assertEquals(expected, output);
	}

	//test triple-level hierachy
	@Test
	public void buildAccountHierarchy3() {
		MockAccessibleCustomersServlet testServlet = new MockAccessibleCustomersServlet();
		ArrayList<CustomerClient> output = new ArrayList<>();
		ArrayList<CustomerClient> expected = new ArrayList<>();
		//note DFS order!
		expected.add(CCMOCK1);
		expected.add(CCMOCK3);
		expected.add(CCMOCK2);

		//Multimap: {[0: 1, 2], [1: 3]}
		Multimap<Long, CustomerClient> customerIdsToChildAccounts = ArrayListMultimap.create();
		customerIdsToChildAccounts.put(0L, CCMOCK1);
		customerIdsToChildAccounts.put(0L, CCMOCK2);
		customerIdsToChildAccounts.put(1L, CCMOCK3);

		testServlet.buildAccountHierarchy(CCMOCK0, customerIdsToChildAccounts, 0, output);
		Assert.assertEquals(expected, output);
	}

	//test 4-level hierachy
	@Test
	public void buildAccountHierarchy4() {
		MockAccessibleCustomersServlet testServlet = new MockAccessibleCustomersServlet();
		ArrayList<CustomerClient> output = new ArrayList<>();
		ArrayList<CustomerClient> expected = new ArrayList<>();
		//note DFS order!
		expected.add(CCMOCK1);
		expected.add(CCMOCK3);
		expected.add(CCMOCK4);
		expected.add(CCMOCK2);

		//Multimap: {[0: 1, 2], [1: 3], [3:4]}
		Multimap<Long, CustomerClient> customerIdsToChildAccounts = ArrayListMultimap.create();
		customerIdsToChildAccounts.put(0L, CCMOCK1);
		customerIdsToChildAccounts.put(0L, CCMOCK2);
		customerIdsToChildAccounts.put(1L, CCMOCK3);
		customerIdsToChildAccounts.put(3L, CCMOCK4);

		testServlet.buildAccountHierarchy(CCMOCK0, customerIdsToChildAccounts, 0, output);
		Assert.assertEquals(expected, output);
	}

	private static CustomerClient createCustomerClientMock(long customerId) {
		CustomerClient mock = mock(CustomerClient.class);
		Int64Value mockId = mock(Int64Value.class);
		when(mock.getId()).thenReturn(mockId);
		when(mockId.getValue()).thenReturn(customerId);
		return mock;
	}

}