

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../../Components/card"
import { Button } from "../../Components/button"
import { Badge } from "../../Components/badge"
import { Separator } from "../../Components/seperator"
import { Upload, ImageIcon, FileText, RotateCcw } from "lucide-react"

function App() {
  const [variantA, setVariantA] = useState(null)
  const [variantB, setVariantB] = useState(null)
  const [detailedView, setDetailedView] = useState(false)

  const handleImageUpload = async (file, variant) => {
    const url = URL.createObjectURL(file)

    // Get image dimensions
    const img = new Image()
    img.crossOrigin = "anonymous"
    img.onload = () => {
      const imageData = {
        file,
        url,
        dimensions: { width: img.width, height: img.height },
      }

      if (variant === "A") {
        setVariantA(imageData)
      } else {
        setVariantB(imageData)
      }
    }
    img.src = url
  }

  const handleFileChange = (event, variant) => {
    const file = event.target.files?.[0]
    if (file && file.type.startsWith("image/")) {
      handleImageUpload(file, variant)
    }
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const resetComparison = () => {
    if (variantA) URL.revokeObjectURL(variantA.url)
    if (variantB) URL.revokeObjectURL(variantB.url)
    setVariantA(null)
    setVariantB(null)
    setDetailedView(false)
  }

  const UploadArea = ({ variant, imageData }) => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Variant {variant}</h3>
        {imageData && (
          <Badge variant="secondary" className="text-xs">
            {imageData.dimensions.width} × {imageData.dimensions.height}
          </Badge>
        )}
      </div>

      {!imageData ? (
        <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <Upload className="w-8 h-8 mb-4 text-gray-500" />
            <p className="mb-2 text-sm text-gray-500">
              <span className="font-semibold">Click to upload</span> Variant {variant}
            </p>
            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
          </div>
          <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileChange(e, variant)} />
        </label>
      ) : (
        <div className="space-y-3">
          <div className="relative w-full h-64 bg-gray-100 rounded-lg overflow-hidden">
            <img
              src={imageData.url || "/placeholder.svg"}
              alt={`Variant ${variant}`}
              className="w-full h-full object-contain"
            />
          </div>

          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>File name:</span>
              <span className="font-medium truncate ml-2">{imageData.file.name}</span>
            </div>
            <div className="flex justify-between">
              <span>File size:</span>
              <span className="font-medium">{formatFileSize(imageData.file.size)}</span>
            </div>
            <div className="flex justify-between">
              <span>Dimensions:</span>
              <span className="font-medium">
                {imageData.dimensions.width} × {imageData.dimensions.height}
              </span>
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            className="w-full bg-transparent"
            onClick={() => {
              const input = document.createElement("input")
              input.type = "file"
              input.accept = "image/*"
              input.onchange = (e) => handleFileChange(e, variant)
              input.click()
            }}
          >
            <Upload className="w-4 h-4 mr-2" />
            Replace Image
          </Button>
        </div>
      )}
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">A/B Visual Split Comparison Tool</h1>
          <p className="text-gray-600">Upload and compare two design variants to make data-driven decisions</p>
        </div>

        {!variantA && !variantB ? (
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ImageIcon className="w-5 h-5" />
                Upload Your Variants
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <UploadArea variant="A" imageData={variantA} />
                <UploadArea variant="B" imageData={variantB} />
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                <Button
                  variant={!detailedView ? "default" : "outline"}
                  onClick={() => setDetailedView(false)}
                  size="sm"
                >
                  <ImageIcon className="w-4 h-4 mr-2" />
                  Comparison View
                </Button>
                <Button variant={detailedView ? "default" : "outline"} onClick={() => setDetailedView(true)} size="sm">
                  <FileText className="w-4 h-4 mr-2" />
                  Detailed View
                </Button>
              </div>
              <Button variant="outline" onClick={resetComparison} size="sm">
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>
            </div>

            {!detailedView ? (
              <Card>
                <CardHeader>
                  <CardTitle>Side-by-Side Comparison</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-red-600">Variant A</h3>
                        {variantA && (
                          <Badge variant="outline">
                            {variantA.dimensions.width} × {variantA.dimensions.height}
                          </Badge>
                        )}
                      </div>
                      {variantA ? (
                        <div className="relative w-full h-96 bg-gray-100 rounded-lg overflow-hidden">
                          <img
                            src={variantA.url || "/placeholder.svg"}
                            alt="Variant A"
                            className="w-full h-full object-contain"
                          />
                        </div>
                      ) : (
                        <UploadArea variant="A" imageData={variantA} />
                      )}
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-green-600">Variant B</h3>
                        {variantB && (
                          <Badge variant="outline">
                            {variantB.dimensions.width} × {variantB.dimensions.height}
                          </Badge>
                        )}
                      </div>
                      {variantB ? (
                        <div className="relative w-full h-96 bg-gray-100 rounded-lg overflow-hidden">
                          <img
                            src={variantB.url || "/placeholder.svg"}
                            alt="Variant B"
                            className="w-full h-full object-contain"
                          />
                        </div>
                      ) : (
                        <UploadArea variant="B" imageData={variantB} />
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="grid lg:grid-cols-2 gap-6">
                {[
                  { variant: "A", data: variantA, color: "red" },
                  { variant: "B", data: variantB, color: "green" },
                ].map(({ variant, data, color }) => (
                  <Card key={variant}>
                    <CardHeader>
                      <CardTitle className={`text-${color}-600`}>Variant {variant} - Detailed Analysis</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {data ? (
                        <div className="space-y-6">
                          <div className="relative w-full h-64 bg-gray-100 rounded-lg overflow-hidden">
                            <img
                              src={data.url || "/placeholder.svg"}
                              alt={`Variant ${variant}`}
                              className="w-full h-full object-contain"
                            />
                          </div>

                          <div className="space-y-4">
                            <div>
                              <h4 className="font-semibold mb-2">File Information</h4>
                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Name:</span>
                                  <span className="font-medium">{data.file.name}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Size:</span>
                                  <span className="font-medium">{formatFileSize(data.file.size)}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Type:</span>
                                  <span className="font-medium">{data.file.type}</span>
                                </div>
                              </div>
                            </div>

                            <Separator />

                            <div>
                              <h4 className="font-semibold mb-2">Image Properties</h4>
                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Dimensions:</span>
                                  <span className="font-medium">
                                    {data.dimensions.width} × {data.dimensions.height}
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Aspect Ratio:</span>
                                  <span className="font-medium">
                                    {(data.dimensions.width / data.dimensions.height).toFixed(2)}:1
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Total Pixels:</span>
                                  <span className="font-medium">
                                    {(data.dimensions.width * data.dimensions.height).toLocaleString()}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <UploadArea variant={variant} imageData={data} />
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {variantA && variantB && (
              <Card>
                <CardHeader>
                  <CardTitle>Comparison Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <h4 className="font-semibold mb-2">File Size Comparison</h4>
                      <div className="space-y-1">
                        <div className="text-sm text-red-600">A: {formatFileSize(variantA.file.size)}</div>
                        <div className="text-sm text-green-600">B: {formatFileSize(variantB.file.size)}</div>
                        <div className="text-xs text-gray-500">
                          {variantA.file.size > variantB.file.size
                            ? `A is ${formatFileSize(variantA.file.size - variantB.file.size)} larger`
                            : variantB.file.size > variantA.file.size
                              ? `B is ${formatFileSize(variantB.file.size - variantA.file.size)} larger`
                              : "Same size"}
                        </div>
                      </div>
                    </div>

                    <div className="text-center">
                      <h4 className="font-semibold mb-2">Dimensions</h4>
                      <div className="space-y-1">
                        <div className="text-sm text-red-600">
                          A: {variantA.dimensions.width} × {variantA.dimensions.height}
                        </div>
                        <div className="text-sm text-green-600">
                          B: {variantB.dimensions.width} × {variantB.dimensions.height}
                        </div>
                        <div className="text-xs text-gray-500">
                          {variantA.dimensions.width === variantB.dimensions.width &&
                          variantA.dimensions.height === variantB.dimensions.height
                            ? "Same dimensions"
                            : "Different dimensions"}
                        </div>
                      </div>
                    </div>

                    <div className="text-center">
                      <h4 className="font-semibold mb-2">Aspect Ratio</h4>
                      <div className="space-y-1">
                        <div className="text-sm text-red-600">
                          A: {(variantA.dimensions.width / variantA.dimensions.height).toFixed(2)}:1
                        </div>
                        <div className="text-sm text-green-600">
                          B: {(variantB.dimensions.width / variantB.dimensions.height).toFixed(2)}:1
                        </div>
                        <div className="text-xs text-gray-500">
                          {Math.abs(
                            variantA.dimensions.width / variantA.dimensions.height -
                              variantB.dimensions.width / variantB.dimensions.height,
                          ) < 0.01
                            ? "Same ratio"
                            : "Different ratios"}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default App
