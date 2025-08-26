<div className="mb-6">
                  <label
                    htmlFor="username"
                    className="block text-amber-50 text-base mb-1 tracking-wide"
                  >
                    Username
                  </label>
                  <input
                    {...register("username", {
                      required: "This field is required",
                    })}
                    aria-invalid={errors.username ? "true" : "false"}
                    type="text"
                    id="username"
                    className="w-full bg-transparent border-b border-gray-400 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500"
                    placeholder="Enter your username"
                    autoComplete="username"
                  />
                  {/* Mensaje de error */}
                  {errors.username && (
                    <p
                      role="alert"
                      className="text-red-500 flex items-center gap-1"
                    >
                      <PiWarningCircle /> {/* icono */}
                      {errors.username.message}
                    </p>
                  )}
                </div>