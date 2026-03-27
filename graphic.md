{/_ Feature Highlight: 3-Hour Delivery _/}

<section className="py-24 bg-slate-900 text-white overflow-hidden relative">
<div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\' fill=\'%237642FE\' fill-opacity=\'0.1\' fill-rule=\'evenodd\'/%3E%3C/svg%3E\')] opacity-20" />

          <div className="container mx-auto px-6 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#7642FE]/20 border border-[#7642FE]/30 text-purple-300 mb-6">
                  <Zap className="w-4 h-4" />
                  <span className="text-sm font-semibold">Lightning Fast</span>
                </div>
                <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                  Get Powerful Designs
                  <span className="text-[#7642FE]"> in Hours</span> — Not Weeks
                </h2>
                <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                  Need a sales flyer? Instagram creatives? Ad banners? Submit
                  your request and receive professional designs in as little as{" "}
                  <span className="text-white font-bold">3 hours</span>.
                </p>

                <div className="space-y-4 mb-8">
                  {[
                    "No chasing designers",
                    "No long wait times",
                    "No inconsistent branding",
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      className="flex items-center gap-3"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <CheckCircle2 className="w-6 h-6 text-[#7642FE] flex-shrink-0" />
                      <span className="text-lg">{item}</span>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  className="bg-[#7642FE] hover:bg-purple-600 text-white text-lg font-semibold px-8 py-4 rounded-full shadow-xl shadow-purple-500/25 inline-flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Request a 3-Hour Design Now
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </motion.div>

              <motion.div
                className="relative"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
              >
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10">
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#7642FE]/20 to-transparent" />
                  <Image
                    src="/DMA-uploads/8deb37e4-5ae4-4872-992a-1c70885b9e34.png"
                    alt="DMA Dashboard"
                    width={600}
                    height={400}
                    className="w-full h-auto"
                  />
                  {/* Floating Stats Card */}
                  <motion.div
                    className="absolute -bottom-6 -left-6 bg-white text-gray-900 p-6 rounded-2xl shadow-xl"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                        <Clock className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Avg. Delivery</p>
                        <p className="text-2xl font-bold text-gray-900">
                          2.4 hrs
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
