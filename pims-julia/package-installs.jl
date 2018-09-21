import Pkg

metadata_packages = [
    "BinDeps",
    "Cairo",
    "Calculus",
    "Clustering",
    "Clp",
    "Colors",
    "DataArrays",
    "DataFrames",
    "DataFramesMeta",
    "Dates",
    "DecisionTree",
    "Distributions",
    "Distances",
    "GLM",
    "GraphLayout",
    "HDF5",
    "HypothesisTests",
    "IJulia",
    "Ipopt",
    "JSON",
    "KernelDensity",
    "Lazy",
    "Lora",
    "MLBase",
    "MultivariateStats",
    "NLopt",
    "NMF",
    "Optim",
    "ODE",
    "Patchwork",
    "PDMats",
    "PGFPlots",
    "Plots",
    "PyCall",
    "PyPlot",
    "Quandl",
    "QuantEcon",
    "RDatasets",
    "SQLite",
    "Stan",
    "StatsBase",
    "Sundials",
    "TextAnalysis",
    "TimeSeries",
    "ZipFile",
    "ZMQ"
]

for package=metadata_packages
    Pkg.add(package)
end

for package=metadata_packages
    Pkg.precompile(package)
end
