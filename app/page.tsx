"use client";

import React, { useState } from "react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import Map from "@/components/Map";

export default function Page() {
  const { theme } = useTheme();
  const router = useRouter();
  return (
    <div className="min-h-screen">
				<section id="banner">
					<div className="content">
						<h2>Welcome to The World Climate.com</h2>
						<p>A site where we&apos;re looking to improve our worlds outlook by providing resources and tooling for everyone to examine the future of climate in their own backyard</p>
					</div>
				</section>
        <Map />
				<section id="main">
					<div className="container">
						<div className="row gtr-200">
							<div className="col-12">
									<section className="box highlight">
										<ul className="special">
											<li><a href="#" className="icon fa-thin fa-hand-holding-seedling"><span className="label">Seedling</span></a></li>
											<li><a href="#" className="icon fa-thin fa-sun-haze"><span className="label">Sun</span></a></li>
											<li><a href="#" className="icon fa-thin fa-cloud-hail-mixed"><span className="label">Rain</span></a></li>
											<li><a href="#" className="icon fa-thin fa-house-tsunami"><span className="label">Hurricane</span></a></li>
										</ul>
										<header>
											<h2>Physical Risk & Climate</h2>
											<p>Analyze climate outlook & physical Risk based on location</p>
										</header>
										<p>
											Before you invest in new infrastructure or expand your business to a new location<br />
											run a climate risk assessment to understand the potential risks and opportunities.
										</p>
									</section>
							</div>
							<div className="col-12">
									<section className="box features">
										<h2 className="major"><span>Generate Reports</span></h2>
										<div>
											<div className="row">
                      <div className="col-3 col-6-medium col-12-small">
														<section className="box feature">
															<h3><a href="#">Business Case Analysis</a></h3>
															<p>
																Analyze the Climate Risk of your business case to understand the potential risks and opportunities.
															</p>
														</section>
												</div>
												<div className="col-3 col-6-medium col-12-small">
														<section className="box feature">
															<h3><a href="#">Physical Risk</a></h3>
															<p>
																Before you invest in new infrastructure or expand your business to a new location, run a climate risk assessment to understand the potential risks and opportunities.
															</p>
														</section>

												</div>
												<div className="col-3 col-6-medium col-12-small">
														<section className="box feature">
															<h3><a href="#">Sales Targeting</a></h3>
															<p>
																With rising temperatures and an increasing number of flood events on the horizon, it&apos;s important to understand potential future geographical growth areas for your sales.
															</p>
														</section>

												</div>
												<div className="col-3 col-6-medium col-12-small">
														<section className="box feature">
															<h3><a href="#">Real Estate</a></h3>
															<p>
																Thinking about moving to a new city? Understand the potential risks and opportunities of your new location.
															</p>
														</section>

												</div>
											</div>
										</div>
									</section>
							</div>
						</div>
					</div>
				</section>
    </div>
  );
}
