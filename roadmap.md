# The AI Learning Path
### From First Principles to the Frontier — A Complete Roadmap

---

> This roadmap does not teach you to use AI tools. It teaches you to understand AI systems — deeply enough to build them, critique them, and push against their limits. The destination is not just technical fluency. It is the ability to think at the frontier.

---

## How to Read This Roadmap

Eleven phases. Each phase has a **goal**, a **core curriculum**, and a **resource stack** with direct links to every source. Some phases are sequential. A few can run in parallel once you have the spine.

The map is designed for a person starting from zero but committed to going all the way. There are no shortcuts marked here. Every phase earns the next one.

**Estimated total timeline:** 24–30 months of serious, consistent engagement.

---

## Phase 0 — Orientation: What You're Actually Walking Into

**Goal:** Understand the intellectual history and conceptual structure of AI before writing a single line of code. Most people skip this. That is why most people remain confused about the difference between AI, ML, GenAI, and agents for years.

### Core Topics

**1. The History of Artificial Intelligence**
AI is not a new field. It is a 70-year-old discipline that has had two brutal winters and one extraordinary spring. Understanding this history reveals the biases, debates, and open wounds embedded in how the field is built today.

- **1950:** Alan Turing's "Computing Machinery and Intelligence" — the question that started everything
- **1956:** Dartmouth Conference — AI born as a discipline; the original dream of symbolic reasoning
- **1960s–70s:** Expert Systems and GOFAI (Good Old-Fashioned AI) — rule-based systems that worked until they didn't
- **1974–1980 and 1987–1993:** The AI Winters — why funding collapsed and what that taught the field
- **1980s:** Backpropagation rediscovered; neural networks return quietly
- **1997:** Deep Blue defeats Kasparov — narrow AI's first cultural moment
- **2006:** Hinton's breakthrough on deep belief networks — the spark that lit the deep learning era
- **2012:** AlexNet wins ImageNet by a margin that shocked the field — the beginning of everything modern
- **2017:** "Attention is All You Need" — the transformer paper that remade the entire stack
- **2020:** GPT-3 — emergent capabilities at scale; the world notices
- **2022:** ChatGPT — the moment AI became a general public conversation
- **2023–present:** The agentic turn, reasoning models, multimodality, the race to AGI

**2. The Vocabulary Problem**
AI, Machine Learning, Deep Learning, Generative AI, and Foundation Models are not interchangeable. Understand the nesting:
- **Artificial Intelligence:** the broad field — any system that mimics intelligent behavior
- **Machine Learning:** a subset — systems that learn from data rather than explicit rules
- **Deep Learning:** a subset of ML — ML using multi-layer neural networks
- **Generative AI:** models that generate content (text, image, audio, video)
- **Foundation Models:** large pre-trained models adapted to many downstream tasks
- **Large Language Models (LLMs):** a specific type of foundation model trained primarily on text

**3. Types of AI by Capability**
- **ANI — Artificial Narrow Intelligence:** Does one thing very well. This is all AI that exists today.
- **AGI — Artificial General Intelligence:** Can reason and learn across any domain at human level. Does not exist.
- **ASI — Artificial Super Intelligence:** Surpasses human cognition across all domains. Theoretical.

**4. How to Think About AI**
AI is simultaneously a scientific field, an engineering discipline, and a philosophical project. You need all three lenses.

### Resource Stack

**Books**
- *Artificial Intelligence: A Modern Approach* — Russell & Norvig → https://www.amazon.com/Artificial-Intelligence-Modern-Approach-4th/dp/0134610997
- *The Dream Machine* — M. Mitchell Waldrop → https://www.amazon.com/Dream-Machine-M-Mitchell-Waldrop/dp/1732265119
- *Genius Makers* — Cade Metz → https://www.amazon.com/Genius-Makers-Mavericks-Started-Revolution/dp/1524742678

**Papers**
- "Computing Machinery and Intelligence" — Alan Turing (1950) → https://www.cs.ox.ac.uk/activities/turing/scanned/Computing_Machinery_and_Intelligence.pdf
- Dartmouth Proposal — McCarthy et al. (1955) → http://jmc.stanford.edu/articles/dartmouth/dartmouth.pdf

**Video**
- The Turing Lectures — Royal Institution → https://www.youtube.com/@TheRoyalInstitution
- History of AI — Lex Fridman MIT 6.S099, Lecture 1 → https://www.youtube.com/watch?v=-GUthdgyZAQ

---

## Phase 1 — Mathematical Spine

**Goal:** Build the mathematical intuition required to understand why neural networks work. You do not need a PhD. You need honest fluency in four areas.

### Core Topics

**1. Linear Algebra**
The language of data in AI. Vectors represent data points. Matrices represent transformations. Neural networks are sequences of matrix multiplications and non-linear functions.
- Vectors, vector spaces, dot products, norms
- Matrix multiplication, transpose, inverse, rank
- Eigenvalues and eigenvectors (critical for PCA and understanding attention)
- Singular Value Decomposition (SVD)

**2. Calculus and Optimization**
Neural networks learn by computing gradients and descending them. If you do not understand derivatives, you do not understand learning.
- Derivatives, partial derivatives, chain rule (backpropagation is chain rule applied systematically)
- Gradient: the direction of steepest ascent
- Gradient Descent: moving opposite to the gradient to minimize loss
- Multivariable calculus and Jacobians

**3. Probability and Statistics**
AI is fundamentally about uncertainty. Every model is a probability distribution over possible outputs.
- Random variables, probability distributions (Gaussian, Bernoulli, Categorical)
- Conditional probability and Bayes' theorem
- Expectation, variance, covariance
- Maximum Likelihood Estimation (MLE) — how models are trained
- KL Divergence — how we measure the difference between two distributions
- The Central Limit Theorem

**4. Information Theory**
- Entropy: a measure of uncertainty or information content
- Cross-entropy loss: the most common loss function in deep learning — and why it connects to probability
- Mutual information

### Resource Stack

**Courses**
- Mathematics for Machine Learning Specialization — Imperial College London, Coursera → https://www.coursera.org/specializations/mathematics-machine-learning
- Gilbert Strang's Linear Algebra — MIT OpenCourseWare → https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/
- 18.650 Statistics for Applications — MIT OpenCourseWare → https://ocw.mit.edu/courses/18-650-statistics-for-applications-fall-2016/

**YouTube**
- Essence of Linear Algebra — 3Blue1Brown → https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab
- Essence of Calculus — 3Blue1Brown → https://www.youtube.com/playlist?list=PLZHQObOWTQDMsr9K-rj53DwVRMYO3t5Yr
- StatQuest with Josh Starmer → https://www.youtube.com/@statquest

**Books**
- *Mathematics for Machine Learning* — Deisenroth, Faisal, Ong (free) → https://mml-book.github.io/
- *The Elements of Statistical Learning* — Hastie, Tibshirani, Friedman (free) → https://hastie.su.domains/ElemStatLearn/

---

## Phase 2 — Classical Machine Learning

**Goal:** Understand the learning paradigm before entering the complexity of deep learning. These methods remain in production daily. Understanding them makes everything that follows more legible.

### Core Topics

**1. The Learning Paradigm**
- **Supervised Learning:** Learn a mapping from inputs to labeled outputs
- **Unsupervised Learning:** Find structure in unlabeled data
- **Semi-supervised Learning:** Mix of labeled and unlabeled data
- **Self-supervised Learning:** The model creates its own labels from data structure — the paradigm behind LLM pre-training
- **Reinforcement Learning:** An agent learns by interacting with an environment and receiving rewards (deep treatment in Phase 4)

**2. Core Algorithms**
- *Regression:* Linear Regression, Ridge/Lasso, Logistic Regression
- *Tree-based:* Decision Trees, Random Forests, Gradient Boosting (XGBoost, LightGBM)
- *Kernel Methods:* Support Vector Machines (SVM)
- *Nearest Neighbors:* K-Nearest Neighbors
- *Clustering:* K-Means, DBSCAN, Hierarchical Clustering
- *Dimensionality Reduction:* PCA, t-SNE, UMAP

**3. The Fundamental Tradeoffs**
- Bias-Variance Tradeoff: underfitting vs. overfitting — the central tension in all of ML
- No Free Lunch Theorem: no single algorithm is best for every problem
- Regularization: L1 (Lasso), L2 (Ridge)

**4. Model Evaluation**
- Train/Validation/Test splits; Cross-validation (k-fold)
- Metrics: Accuracy, Precision, Recall, F1-Score, ROC-AUC, RMSE, MAE
- Confusion matrices and calibration

**5. Recommender Systems**
A standalone ML vertical powering every platform people use daily. Often omitted from learning paths — it should not be.
- **Collaborative Filtering:** recommend based on what similar users liked
- **Content-based Filtering:** recommend based on item features
- **Matrix Factorization (SVD, ALS):** decompose user-item interaction matrix into latent factors
- **Neural Collaborative Filtering:** deep learning for recommendations
- **Two-Tower Models:** separate encoder for user and item; the architecture behind YouTube, TikTok, Spotify recommendations
- Cold start problem: how to recommend to new users with no history
- Exploration vs exploitation: the bandit approach to recommendation

**6. Time Series and Forecasting**
One of the most commercially important ML domains. Stock prices, sensor readings, energy consumption, traffic, demand forecasting — all are time series problems.
- **Stationarity:** a time series is stationary if its statistical properties don't change over time; most ML assumptions require it
- **Decomposition:** trend + seasonality + noise; understanding what you're actually modeling
- **Classical Statistical Models:**
  - ARIMA (AutoRegressive Integrated Moving Average): the foundational model; handles trend and autocorrelation
  - SARIMA: extends ARIMA with seasonality
  - Exponential Smoothing (Holt-Winters): weighted average of past observations; still competitive
- **Feature Engineering for Time Series:**
  - Lag features: value at t-1, t-7, t-30
  - Rolling statistics: rolling mean, std, min, max
  - Fourier features for seasonality encoding
- **Machine Learning on Time Series:**
  - LightGBM and XGBoost with lag features: often the strongest approach for structured time series
  - Random Forests: can model non-linear temporal patterns
- **Deep Learning for Time Series:**
  - Temporal Convolutional Networks (TCNs): dilated causal convolutions capture long-range dependencies
  - **N-BEATS:** neural basis expansion for interpretable forecasting; state-of-the-art for univariate
  - **Temporal Fusion Transformer (TFT):** combines attention with gating; strong multi-horizon, multi-variate forecaster
  - PatchTST: treats time series patches as tokens; transformer-based; strong benchmark results
- **Evaluation:** MAPE (Mean Absolute Percentage Error), MAE, RMSE, MASE (Mean Absolute Scaled Error)
- **Libraries:** Prophet (Facebook), statsmodels, Darts, NeuralForecast

**7. Feature Engineering**
- Normalization and standardization
- Handling missing data, encoding categorical variables
- Feature importance and selection
- Class imbalance handling (SMOTE, class weights)

**Programming**
- Python: NumPy, Pandas, Matplotlib, Scikit-learn

### Resource Stack

**Courses**
- Machine Learning Specialization — Andrew Ng, Coursera → https://www.coursera.org/specializations/machine-learning-introduction
- fast.ai Part 1 — Practical Deep Learning for Coders → https://course.fast.ai/
- CS229: Machine Learning — Stanford (YouTube) → https://www.youtube.com/playlist?list=PLoROMvodv4rMiGQp3WXShtMGgzqpfVfbU

**Books**
- *Hands-On Machine Learning with Scikit-Learn, Keras & TensorFlow* — Aurélien Géron → https://www.oreilly.com/library/view/hands-on-machine-learning/9781492032632/
- *The Hundred-Page Machine Learning Book* — Andriy Burkov → http://themlbook.com/

**YouTube**
- StatQuest with Josh Starmer → https://www.youtube.com/@statquest
- Sentdex → https://www.youtube.com/@sentdex

**Documentation**
- Scikit-learn User Guide → https://scikit-learn.org/stable/user_guide.html
- Darts Documentation (time series) → https://unit8co.github.io/darts/
- NeuralForecast (Nixtla) → https://nixtla.github.io/neuralforecast/

**Papers (Time Series)**
- "N-BEATS: Neural basis expansion analysis for interpretable time series forecasting" — Oreshkin et al. (2019) → https://arxiv.org/abs/1905.10437
- "Temporal Fusion Transformers for Interpretable Multi-horizon Time Series Forecasting" — Lim et al. (2020) → https://arxiv.org/abs/1912.09363

---

## Phase 3 — Natural Language Processing

**Goal:** Understand how machines process, represent, and generate human language — from symbolic approaches to the statistical revolution to the neural era. NLP is not a specialty adjacent to AI. It is the core of modern AI. Every major capability you care about — reasoning, instruction-following, conversation, coding, summarization — runs on NLP foundations.

### Core Topics

**1. The Linguistic Foundation**
Before the math, understand what language actually is:
- **Morphology:** how words are formed (root, prefix, suffix, inflection)
- **Syntax:** the rules governing sentence structure; parse trees; dependency parsing
- **Semantics:** meaning — word meaning, sentence meaning, compositionality
- **Pragmatics:** meaning in context — what the speaker intends, not just what words mean
- **Discourse:** how sentences connect across paragraphs and documents
- **Ambiguity:** why language is hard (lexical, syntactic, semantic ambiguity — the word "bank" problem)

Understanding these is what separates someone who uses NLP from someone who understands why it fails.

**2. Classical (Pre-Neural) NLP**
These approaches defined the field for decades and remain in production:
- **Text Preprocessing pipeline:** tokenization → lowercasing → punctuation removal → stopword removal → stemming (Porter/Snowball) vs. lemmatization (WordNet-based)
- **Bag of Words (BoW):** represent text as a vector of word frequencies — order ignored
- **TF-IDF (Term Frequency–Inverse Document Frequency):** weight words by how rare they are across documents; still effective for search and classification
- **N-grams:** sequences of N consecutive words; bigrams capture "New York"; unigrams don't
- **Naïve Bayes classifier:** the original spam filter; probabilistic text classification
- **Hidden Markov Models (HMMs):** sequence modeling with hidden states; used for POS tagging and speech recognition before neural models
- **Conditional Random Fields (CRFs):** sequence labeling with feature-rich modeling; still used for NER in production systems

**3. Core NLP Tasks**
Every LLM capability traces back to one of these tasks:
- **Tokenization:** splitting text into units (words, subwords, characters)
- **Part-of-Speech (POS) Tagging:** labeling words as noun, verb, adjective, etc.
- **Named Entity Recognition (NER):** identifying persons, organizations, locations, dates in text
- **Dependency Parsing:** identifying grammatical relationships between words
- **Coreference Resolution:** understanding that "she" refers to "Alice" in a paragraph
- **Sentiment Analysis:** classifying text as positive, negative, neutral
- **Text Classification:** assigning categories to documents
- **Question Answering (QA):** extractive (find the span in a passage) and generative (generate the answer)
- **Machine Translation:** translating text between languages
- **Text Summarization:** extractive vs. abstractive
- **Information Extraction:** pulling structured facts from unstructured text
- **Natural Language Inference (NLI):** does premise entail, contradict, or is neutral to hypothesis?

**4. The Statistical Revolution**
- Language Models: P(word | context) — assigning probability to word sequences
- N-gram language models: estimate probability from n-gram counts; the internet-scale approach before neural LMs
- **Perplexity:** the standard metric for language model quality; lower perplexity = better model

**5. Word Representations**
The breakthrough that connected classical NLP to deep learning:
- **One-hot encoding:** sparse, no semantic relationship captured
- **Distributional semantics:** the distributional hypothesis — words that appear in similar contexts have similar meanings
- **Word2Vec (2013):** dense vector representations trained by predicting context (CBOW) or center word (Skip-gram); "king - man + woman ≈ queen" — the most famous result in NLP history
- **GloVe (2014):** Global Vectors for Word Representation; combines matrix factorization with local context prediction
- **FastText:** extends Word2Vec with subword information; handles morphologically rich languages and out-of-vocabulary words better
- Limitations of static embeddings: "bank" has one vector regardless of meaning — the polysemy problem

**6. Deep Learning for NLP (Pre-Transformer)**
- **Recurrent Neural Networks (RNNs):** process sequences step by step; hidden state carries information forward
- **Vanishing gradient in RNNs:** information from 100 tokens ago is nearly gone by the time you reach token 200
- **Long Short-Term Memory (LSTM):** gates (input, forget, output) allow selective memory over long sequences
- **Gated Recurrent Unit (GRU):** simpler LSTM variant; fewer parameters; comparable performance
- **Bidirectional RNNs:** process sequence in both directions; captures both past and future context
- **Seq2Seq (Sequence-to-Sequence):** encoder compresses input into a fixed vector; decoder generates output; the architecture behind early machine translation
- **Attention Mechanism (pre-transformer):** instead of compressing everything into one vector, let the decoder look at all encoder states weighted by relevance — Bahdanau attention (2015); the conceptual parent of the transformer

**7. ELMo and the Contextualized Representation Era**
- **ELMo (2018):** Embeddings from Language Models; the same word gets a different vector based on its context — solved the polysemy problem; derived from bidirectional LSTMs
- The key insight of ELMo: **context-dependent** representations outperform static embeddings dramatically; this insight carried forward into BERT and every transformer model

**8. Libraries and Tools**
- **spaCy:** the production NLP library — fast, accurate; tokenization, NER, POS, dependency parsing → https://spacy.io/
- **NLTK:** classical NLP toolkit; more educational than production → https://www.nltk.org/
- **Hugging Face Transformers:** the standard library for transformer-based NLP → https://huggingface.co/docs/transformers/

### Resource Stack

**Courses**
- CS224N: Natural Language Processing with Deep Learning — Stanford (free, YouTube) → https://www.youtube.com/playlist?list=PLoROMvodv4rOSH4v6133s9LFPRHjEmbmJ
- Hugging Face NLP Course (free) → https://huggingface.co/learn/nlp-course/
- Natural Language Processing Specialization — DeepLearning.AI, Coursera → https://www.coursera.org/specializations/natural-language-processing

**Books**
- *Speech and Language Processing* — Jurafsky & Martin (free, the definitive NLP textbook) → https://web.stanford.edu/~jurafsky/slp3/
- *Natural Language Processing with Transformers* — Lewis Tunstall et al. (O'Reilly) → https://www.oreilly.com/library/view/natural-language-processing/9781098136789/
- *Neural Network Methods for Natural Language Processing* — Goldberg → https://www.morganclaypool.com/doi/abs/10.2200/S00762ED1V01Y201703HLT037

**Papers**
- "Efficient Estimation of Word Representations in Vector Space" (Word2Vec) — Mikolov et al. (2013) → https://arxiv.org/abs/1301.3781
- "GloVe: Global Vectors for Word Representation" — Pennington et al. (2014) → https://aclanthology.org/D14-1162/
- "Neural Machine Translation by Jointly Learning to Align and Translate" (Bahdanau Attention) — Bahdanau et al. (2015) → https://arxiv.org/abs/1409.0473
- "Deep contextualized word representations" (ELMo) — Peters et al. (2018) → https://arxiv.org/abs/1802.05365

**YouTube / Blogs**
- The Illustrated Word2Vec — Jay Alammar → https://jalammar.github.io/illustrated-word2vec/
- Lilian Weng — NLP overview series → https://lilianweng.github.io/
- 3Blue1Brown — Attention mechanism visualization (part of the Transformer series) → https://www.youtube.com/watch?v=eMlx5fFNoYc

**Documentation**
- spaCy Documentation → https://spacy.io/usage
- NLTK Documentation → https://www.nltk.org/book/

---

## Phase 4 — Deep Learning

**Goal:** Understand how multi-layer neural networks learn representations from data. This phase covers the fundamental building blocks of everything that follows.

### Core Topics

**1. The Neuron and the Network**
- The perceptron: inputs, weights, bias, activation
- Why a single layer fails (the XOR problem — what caused the first AI winter for neural nets)
- Multi-layer perceptron (MLP): the universal approximation theorem
- Activation functions: ReLU, sigmoid, tanh, GELU, SiLU, Swish

**2. Backpropagation — The Most Important Algorithm in Modern AI**
- Forward pass: computing predictions
- Loss function: measuring error
- Backward pass: computing gradients using the chain rule
- Weight update: gradient descent step

**3. Training Mechanics**
- Loss functions: MSE (regression), Cross-Entropy (classification)
- Optimizers: SGD, Momentum, Adam, AdamW (the default for LLMs)
- Learning rate schedules: warmup, cosine annealing, cyclical LR
- Batch size and its interaction with learning rate
- Gradient clipping

**4. Regularization and Stability**
- Dropout, Batch Normalization, Layer Normalization
- Weight initialization (Xavier, He)
- Vanishing and exploding gradient problems

**5. Convolutional Neural Networks (CNNs) and Computer Vision**
- Convolution operation: spatial filtering over images
- Pooling layers: spatial downsampling
- Key architectures: LeNet → AlexNet → VGG → ResNet (residual connections) → EfficientNet → ConvNeXt
- Why residual connections solved the deep network degradation problem
- Transfer learning: using a pre-trained CNN as a feature extractor

**Computer Vision Task Taxonomy**
Understanding the full hierarchy of vision tasks is essential — image classification is only the beginning:

- **Image Classification:** assign one label to an entire image (AlexNet, ResNet)
- **Object Detection:** draw bounding boxes around objects and classify each
  - R-CNN family (Region-based CNNs): two-stage; propose regions, then classify — slow but accurate
  - Fast R-CNN → Faster R-CNN: the two-stage state-of-the-art before YOLO
  - **YOLO (You Only Look Once):** single-stage; divide image into a grid and predict boxes directly; much faster; YOLOv8, YOLO-NAS are production standards
  - SSD (Single Shot Detector): another single-stage alternative
- **Semantic Segmentation:** classify every pixel in an image (e.g., all road pixels = one class, all sky pixels = another)
  - U-Net: encoder-decoder with skip connections; dominant in medical imaging
  - DeepLab: dilated convolutions to preserve spatial resolution
- **Instance Segmentation:** like semantic segmentation but distinguishes individual object instances
  - Mask R-CNN: extends Faster R-CNN with a mask head per region; the standard
- **Panoptic Segmentation:** combines semantic and instance segmentation into a unified output
- **Pose Estimation:** detect human body keypoints (joints) and their spatial relationships
  - OpenPose, MediaPipe Pose: production-ready
- **Depth Estimation:** predict per-pixel depth from a single image (monocular depth)
- **Image Segmentation with Vision Transformers:**
  - SAM (Segment Anything Model, Meta): general-purpose segmentation with prompting; can segment anything in any image
  - DINO / DINOv2: self-supervised ViT training; powerful visual features without labels

**Contrastive Learning and Self-Supervised Visual Representations**
A critical paradigm for learning visual representations without labeled data — the precursor to how CLIP and multimodal models work:
- **The core idea:** learn representations by pushing similar (augmented views of the same image) together and dissimilar images apart in embedding space
- **SimCLR (2020, Google):** the simple contrastive learning framework; data augmentation → projection head → NT-Xent loss
- **MoCo (Momentum Contrast, 2020, FAIR):** maintain a queue of negative examples with a momentum-updated encoder; memory-efficient
- **BYOL (Bootstrap Your Own Latent, 2020, DeepMind):** contrastive learning without negative pairs; one network bootstraps off a momentum copy of itself
- **DINO (Self-DIstillation with NO labels):** self-supervised ViT; the features develop semantic segmentation ability without any labels
- Why this matters: labeled data is expensive; self-supervised representations trained on unlabeled images transfer better than supervised ones for many downstream tasks

**6. Recurrent Architectures (Bridge from Phase 3)**
- RNNs, LSTMs, GRUs — already covered in NLP context; understand the deep learning mechanics here
- Sequence-to-sequence with attention
- Why these gave way to transformers

**7. Graph Neural Networks (GNNs)**
Graph-structured data is everywhere: molecules, social networks, knowledge graphs, citation networks, road maps. Standard neural networks cannot handle it. GNNs can.
- **Graph representation:** nodes (entities), edges (relationships), node/edge features
- **Message Passing:** each node aggregates information from its neighbors iteratively
- **Graph Convolutional Network (GCN):** spectral convolution on graphs; first major GNN
- **Graph Attention Network (GAT):** attention-weighted message passing; learns which neighbors to attend to
- **GraphSAGE:** inductive learning on graphs; works on nodes not seen during training
- Key applications:
  - Drug discovery: molecular property prediction (DeepMind's AlphaFold uses structural graphs)
  - Recommendation systems: Pinterest, Uber Eats, LinkedIn all use GNNs
  - Knowledge graph reasoning
  - Traffic and routing (Google Maps uses GNNs)
  - Fraud detection

**8. Frameworks**
- **PyTorch:** dominant research framework; dynamic computation graph → https://pytorch.org/
- TensorFlow/Keras: production ecosystem → https://www.tensorflow.org/
- **PyTorch Geometric:** GNN library built on PyTorch → https://pytorch-geometric.readthedocs.io/
- JAX: NumPy-compatible, hardware-accelerated; growing in research → https://jax.readthedocs.io/

### Resource Stack

**Papers (Computer Vision and Contrastive Learning)**
- "Deep Residual Learning for Image Recognition" (ResNet) — He et al. (2015) → https://arxiv.org/abs/1512.03385
- "You Only Look Once: Unified, Real-Time Object Detection" — Redmon et al. (2015) → https://arxiv.org/abs/1506.02640
- "Mask R-CNN" — He et al. (2017) → https://arxiv.org/abs/1703.06870
- "Segment Anything" (SAM) — Kirillov et al., Meta (2023) → https://arxiv.org/abs/2304.02643
- "A Simple Framework for Contrastive Learning of Visual Representations" (SimCLR) — Chen et al. (2020) → https://arxiv.org/abs/2002.05709
- "Emerging Properties in Self-Supervised Vision Transformers" (DINO) — Caron et al. (2021) → https://arxiv.org/abs/2104.14294

**Courses**
- Deep Learning Specialization — Andrew Ng, DeepLearning.AI → https://www.coursera.org/specializations/deep-learning
- Neural Networks: Zero to Hero — Andrej Karpathy (YouTube) → https://www.youtube.com/playlist?list=PLAqhIrjkxbuWI23v9cThsA9GvCAUhRvKZ
- MIT 6.S191: Introduction to Deep Learning → http://introtodeeplearning.com/
- CS231N: CNN for Visual Recognition — Stanford → http://cs231n.stanford.edu/
- CS224W: Machine Learning with Graphs — Stanford → https://web.stanford.edu/class/cs224w/

**Books**
- *Deep Learning* — Goodfellow, Bengio, Courville (free) → https://www.deeplearningbook.org/
- *Dive into Deep Learning* — free, interactive notebooks → https://d2l.ai/

**YouTube**
- Andrej Karpathy → https://www.youtube.com/@AndrejKarpathy
- 3Blue1Brown — Neural Networks series → https://www.youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi
- Yannic Kilcher → https://www.youtube.com/@YannicKilcher

**Documentation**
- PyTorch Tutorials → https://pytorch.org/tutorials/

---

## Phase 5 — Reinforcement Learning

**Goal:** Understand how agents learn through interaction, reward, and trial and error. RL is the paradigm behind AlphaGo, game-playing AI, robotics, and — critically — RLHF, the technique that turns raw language models into aligned assistants. This phase is non-optional for anyone who wants to understand how modern LLMs are trained.

### Core Topics

**1. The RL Framework**
- **Agent:** the learner and decision-maker
- **Environment:** what the agent interacts with
- **State (s):** the current situation the agent observes
- **Action (a):** what the agent can do
- **Reward (r):** the scalar signal the agent receives after each action
- **Policy (π):** the agent's strategy — mapping from states to actions
- **Return (G):** the total accumulated reward over time; what the agent actually wants to maximize
- **Discount factor (γ):** weighting future rewards less than immediate rewards

**2. Markov Decision Processes (MDPs)**
- The formal mathematical framework for RL problems
- Markov property: the future depends only on the present state, not the full history
- Value function V(s): expected return from state s under a policy
- Action-value function Q(s, a): expected return from state s taking action a, then following the policy
- Bellman equations: the recursive relationship that defines value functions

**3. Model-Free Methods**
- **Q-Learning:** learn Q(s, a) directly from experience without a model of the environment; off-policy
- **Deep Q-Network (DQN):** Q-learning with a neural network as the Q-function approximator; DeepMind's breakthrough that beat Atari games in 2013
  - Experience replay: store transitions in a buffer; sample randomly to break correlations
  - Target network: a slowly updated copy of the Q-network for stability
- **SARSA:** on-policy alternative to Q-learning
- **Multi-Armed Bandits:** the simplest RL problem; one state, many actions, immediate rewards; directly connects to recommendation exploration-exploitation

**4. Policy Gradient Methods**
Instead of learning a value function and deriving a policy from it, directly optimize the policy.
- **REINFORCE:** the simplest policy gradient algorithm; high variance
- **Actor-Critic:** combine a policy (actor) with a value function (critic) to reduce variance
- **A3C (Asynchronous Advantage Actor-Critic):** parallel agents; the first scalable actor-critic
- **PPO (Proximal Policy Optimization):** the current standard; clips the policy update to prevent destructive large steps; robust, widely used
  - **Why PPO matters here:** PPO is the algorithm used in RLHF for training ChatGPT, Claude, Gemini, and every major aligned LLM

**5. Model-Based RL**
- Learn a model of the environment; plan ahead using the model
- **AlphaGo/AlphaZero (DeepMind):** self-play + MCTS (Monte Carlo Tree Search) + deep neural networks; the most famous RL achievement
- World Models for planning in latent space
- Dyna-Q: combine model-free learning with simulated experience from a learned model

**6. Reward Shaping and Sparse Rewards**
- The sparse reward problem: many environments only give reward at the very end; credit assignment over thousands of steps is hard
- Intrinsic motivation: reward curiosity (visit novel states)
- Reward shaping: adding auxiliary rewards to guide learning without changing the optimal policy
- **Inverse Reinforcement Learning (IRL):** infer the reward function from observing expert behavior; the foundation of Imitation Learning

**7. RL in Language Models (The Direct Connection)**
- **RLHF (Reinforcement Learning from Human Feedback):**
  - Step 1: Train a supervised fine-tuned (SFT) model on demonstrations
  - Step 2: Collect human preference data (A vs B); train a reward model
  - Step 3: Use PPO to optimize the LLM against the reward model
  - The KL divergence penalty: prevent the model from drifting too far from the SFT baseline
- **RLAIF (RL from AI Feedback):** use an AI judge instead of humans for preference labeling
- **DPO (Direct Preference Optimization):** mathematically equivalent to RLHF but skips explicit RL; fine-tunes directly on preferences
- **GRPO (Group Relative Policy Optimization):** used in DeepSeek-R1; train reasoning by rewarding correct final answers with process rewards

### Resource Stack

**Courses**
- Deep Reinforcement Learning Course — Hugging Face (free) → https://huggingface.co/learn/deep-rl-course/unit0/introduction
- CS285: Deep Reinforcement Learning — UC Berkeley (free, YouTube) → https://www.youtube.com/playlist?list=PL_iWQOsE6TfVYGEGiAHTjELkA1ZSCqd5V
- Spinning Up in Deep RL — OpenAI (free documentation + code) → https://spinningup.openai.com/
- RL Course by David Silver — DeepMind/UCL (YouTube) → https://www.youtube.com/playlist?list=PLqYmG7hTraZDM-OYHWgPebj2MfCFzFObQ

**Books**
- *Reinforcement Learning: An Introduction* — Sutton & Barto (free) → http://incompleteideas.net/book/the-book-2nd.html

**Papers**
- "Playing Atari with Deep Reinforcement Learning" — Mnih et al., DeepMind (2013) → https://arxiv.org/abs/1312.5602
- "Proximal Policy Optimization Algorithms" — Schulman et al. (2017) → https://arxiv.org/abs/1707.06347
- "Mastering the game of Go without human knowledge" (AlphaZero) — Silver et al. (2017) → https://www.nature.com/articles/nature24270
- "Training Language Models to Follow Instructions with Human Feedback" (InstructGPT) — Ouyang et al. (2022) → https://arxiv.org/abs/2203.02155
- "Direct Preference Optimization" — Rafailov et al. (2023) → https://arxiv.org/abs/2305.18290

---

## Phase 6 — The Transformer Revolution

**Goal:** Understand the architecture that powers every major AI system of the modern era. The transformer is not a trend. It is the current fundamental unit of intelligence in AI systems.

### Core Topics

**1. The Attention Mechanism**
The key insight: instead of processing a sequence step-by-step, process the entire sequence at once and learn which elements should attend to which other elements.
- **Query, Key, Value:** the three learned projections that define attention
- Scaled dot-product attention: softmax(Q·Kᵀ / √d_k) · V
- Why the √d_k scaling prevents gradient saturation in high dimensions

**2. Multi-Head Attention**
- Multiple attention heads: each can specialize in a different relationship type
- Syntactic heads, semantic heads, positional heads — all learned, not designed
- Concatenation and projection back to model dimension

**3. The Full Transformer Architecture**
- **Encoder:** processes input; produces contextual representations; used in BERT-class models
- **Decoder:** generates output autoregressively; used in GPT-class models
- **Encoder-Decoder:** original architecture for translation; used in T5, BART
- Positional encodings: sine/cosine (original) and Rotary Positional Embeddings (RoPE, used in LLaMA, Mistral, Gemma)
- Feed-Forward Network (FFN): position-wise MLP applied independently to each token
- Residual connections + Layer Normalization: the stability mechanism

**4. The Paradigm Split: BERT vs GPT**
- **BERT (2018):** Bidirectional encoder; Masked Language Modeling; best for understanding tasks
- **GPT (2018–present):** Unidirectional decoder; Causal Language Modeling; best for generation; the paradigm that scaled to LLMs

**5. Tokenization**
- Byte-Pair Encoding (BPE): the dominant tokenization strategy
- SentencePiece: BPE variant; works across languages without pre-tokenization
- Tiktoken (OpenAI): fast BPE implementation used in GPT models
- Why tokenization choices affect model behavior and failure modes

**6. Efficient Attention Variants**
- **FlashAttention:** reorders computation to reduce memory I/O; 2–4× speedup with identical results → the standard for training frontier models
- **Multi-Query Attention (MQA):** all heads share a single Key and Value; faster inference
- **Grouped Query Attention (GQA):** compromise between MHA and MQA; used in LLaMA 3, Mistral
- Linear Attention approximations

**7. Scaling Laws**
- Kaplan et al. (2020): model performance scales as power laws with model size, data, and compute
- Chinchilla scaling laws (2022): the optimal data-to-parameter ratio — most models were undertrained
- Emergent capabilities: abilities that appear abruptly as scale increases

### Resource Stack

**Papers**
- "Attention Is All You Need" — Vaswani et al. (2017) → https://arxiv.org/abs/1706.03762
- "BERT: Pre-training of Deep Bidirectional Transformers" — Devlin et al. (2018) → https://arxiv.org/abs/1810.04805
- "Language Models are Few-Shot Learners" (GPT-3) — Brown et al. (2020) → https://arxiv.org/abs/2005.14165
- "Scaling Laws for Neural Language Models" — Kaplan et al. (2020) → https://arxiv.org/abs/2001.08361
- "Training Compute-Optimal Large Language Models" (Chinchilla) — Hoffmann et al. (2022) → https://arxiv.org/abs/2203.15556
- "FlashAttention" — Dao et al. (2022) → https://arxiv.org/abs/2205.14135

**Courses**
- CS224N — Stanford (YouTube) → https://www.youtube.com/playlist?list=PLoROMvodv4rOSH4v6133s9LFPRHjEmbmJ
- Hugging Face NLP Course → https://huggingface.co/learn/nlp-course/

**Blogs**
- The Illustrated Transformer — Jay Alammar → https://jalammar.github.io/illustrated-transformer/
- The Illustrated BERT — Jay Alammar → https://jalammar.github.io/illustrated-bert/

**Video**
- Let's Build GPT from Scratch — Andrej Karpathy → https://www.youtube.com/watch?v=kCc8FmEb1nY
- Attention Mechanism — 3Blue1Brown → https://www.youtube.com/watch?v=eMlx5fFNoYc

---

## Phase 7 — Foundation Models and the LLM World

**Goal:** Understand how LLMs are built, trained, and aligned. Move from architecture to the full ecosystem — prompt engineering, fine-tuning, RAG, multimodality.

### Core Topics

**1. Pre-training at Scale**
- The data: Common Crawl, The Pile, FineWeb — what LLMs are actually trained on
- Data curation, deduplication, quality filtering, toxicity filtering
- Distributed training: tensor, pipeline, and data parallelism
- Mixed precision training (FP16/BF16)

**2. Instruction Fine-Tuning**
- The gap between next-token prediction and following instructions
- Supervised Fine-Tuning (SFT) on instruction-response pairs
- How FLAN, Alpaca, and instruction datasets are constructed

**3. Alignment: RLHF, DPO, Constitutional AI**
- RLHF pipeline: SFT → reward model → PPO optimization
- DPO: skips explicit RL; fine-tunes directly on preferences
- **Constitutional AI (Anthropic):** a set of principles + AI-generated feedback for alignment; the basis for Claude
- Reward hacking, Goodhart's Law, specification gaming

**4. Prompt Engineering**
- Zero-shot, few-shot, chain-of-thought (CoT)
- Self-consistency: sample multiple reasoning paths, take majority
- ReAct: interleaving reasoning and acting
- Lost-in-the-middle: model attends poorly to information in the middle of long contexts
- Prompt injection and adversarial prompting

**5. Parameter-Efficient Fine-Tuning (PEFT)**
- **LoRA (Low-Rank Adaptation):** add small trainable low-rank matrices to attention layers; freeze originals
- **QLoRA:** LoRA + 4-bit quantization; fine-tune large models on consumer hardware
- Adapter layers, prefix tuning, prompt tuning

**6. Retrieval-Augmented Generation (RAG)**
- Embedding models: encode text as dense vectors; semantic similarity search
- Vector databases: Pinecone, Weaviate, Chroma, pgvector
- Chunking strategies: fixed-size, recursive, semantic, contextual
- Retrieval methods: dense (semantic), sparse (BM25), hybrid
- Advanced RAG: reranking (cross-encoder), HyDE, query rewriting, multi-hop retrieval

**7. Quantization and Efficiency**
- FP16, INT8, INT4 quantization: reduce memory and speed up inference
- GGUF format and llama.cpp: running LLMs locally
- Knowledge Distillation: training a smaller student model from a larger teacher
- Speculative decoding: draft with a small model; verify with the large model

**8. Multimodal Models**
- Vision-Language Models: CLIP, LLaVA, GPT-4V, Gemini, Claude Vision
- Vision Transformer (ViT): images as patches; each patch is a token
- CLIP training: contrastive learning between image and text representations
- Contrastive learning in general: learn representations by pushing similar pairs together, dissimilar pairs apart
- Audio: Whisper (ASR), text-to-speech systems
- The path to any-to-any models

**9. AI for Code (Code Models)**
A distinct and important vertical within LLMs:
- Codex and the shift from natural language to code generation
- Training on code: GitHub repositories, Stack Overflow, documentation
- Key code capabilities: generation, completion, explanation, debugging, refactoring, test generation
- Evaluation: HumanEval benchmark, MBPP (Mostly Basic Python Problems)
- Architecture considerations: code has stricter syntax, deterministic execution; different failure modes than text
- Models to know: Codex (OpenAI), Code Llama (Meta), DeepSeek Coder, StarCoder, Claude for coding tasks
- The next step: code execution as a tool within agent loops

**10. The Open Source LLM Ecosystem**
Understanding the open weight model landscape is non-negotiable. Open models power the majority of production AI outside of the largest consumer products.

- **Why open weights matter:** reproducibility, customizability, cost, data privacy, on-premise deployment
- **Key model families:**
  - **LLaMA (Meta):** the model that changed everything; LLaMA 2 → LLaMA 3 → LLaMA 3.1 405B; the base for most open-weight derivatives
  - **Mistral and Mixtral:** strong performance at small scale; Mixtral 8×7B introduced MoE to the open ecosystem
  - **Gemma (Google):** efficient, well-documented; strong for mobile and edge
  - **Phi (Microsoft):** small models punching above their weight due to high-quality synthetic training data
  - **Falcon (TII):** Arabic-English bilingual; notable open research contribution
  - **DeepSeek:** Chinese lab producing frontier-quality open weights; DeepSeek-V3, DeepSeek-R1 directly challenged GPT-4 performance
  - **Qwen (Alibaba):** strong multilingual; increasingly competitive at every size
- **The Hugging Face Hub:** the central repository for open models, datasets, and spaces → https://huggingface.co/
  - Model cards: documentation for every model
  - GGUF format for llama.cpp; GPTQ/AWQ for quantized GPU inference
  - Spaces: demo apps running on HuggingFace infrastructure
- **Open Instruct:** Allen Institute's framework for instruction-tuning open models → https://github.com/allenai/open-instruct
- **The Lmsys Chatbot Arena:** crowdsourced ELO-based ranking by blind human preference → https://lmarena.ai/
- **Open LLM Leaderboard:** automated benchmark comparisons across open models → https://huggingface.co/spaces/HuggingFaceH4/open_llm_leaderboard
- Licensing landscape: understand the difference between research-only, community, and commercial licenses

### Resource Stack
- "Chain-of-Thought Prompting Elicits Reasoning" — Wei et al. (2022) → https://arxiv.org/abs/2201.11903
- "LoRA: Low-Rank Adaptation of Large Language Models" — Hu et al. (2021) → https://arxiv.org/abs/2106.09685
- "Retrieval-Augmented Generation for Knowledge-Intensive NLP" — Lewis et al. (2020) → https://arxiv.org/abs/2005.11401
- "Evaluating Large Language Models Trained on Code" (HumanEval) — Chen et al. (2021) → https://arxiv.org/abs/2107.03374

**Courses**
- LLM University — Cohere (free) → https://docs.cohere.com/docs/llmu
- Prompt Engineering for Developers — DeepLearning.AI (free) → https://www.deeplearning.ai/short-courses/chatgpt-prompt-engineering-for-developers/
- Advanced RAG Techniques — DeepLearning.AI → https://www.deeplearning.ai/short-courses/building-evaluating-advanced-rag/
- Full Stack LLM Bootcamp — UC Berkeley (free, YouTube) → https://fullstackdeeplearning.com/llm-bootcamp/

**Blogs and References**
- Lilian Weng's Blog → https://lilianweng.github.io/
- Sebastian Raschka Newsletter → https://magazine.sebastianraschka.com/
- Prompt Engineering Guide → https://www.promptingguide.ai/
- Anthropic Prompt Engineering Docs → https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview

---

## Phase 8 — Generative Models

**Goal:** Understand the paradigms for generating images, audio, video, and other continuous data. This is a separate and equally important branch of deep learning that runs alongside the LLM stack. Diffusion models, GANs, and VAEs are not adjacent knowledge — they underpin Stable Diffusion, DALL-E, Sora, audio synthesis, protein generation, and the next generation of multimodal AI.

### Core Topics

**1. Autoencoders**
- The basic architecture: encoder compresses input to a latent code; decoder reconstructs from the latent code
- Reconstruction loss: the model learns to preserve information across the bottleneck
- Applications: denoising, anomaly detection, representation learning
- Limitation: the latent space is not necessarily smooth or continuous — you can't sample freely from it

**2. Variational Autoencoders (VAEs)**
The first principled generative model in the deep learning era.
- Instead of encoding to a point, encode to a distribution (mean and variance)
- **Reparameterization trick:** makes the sampling step differentiable so backprop can flow through
- **Evidence Lower Bound (ELBO):** the loss function; balances reconstruction quality against KL divergence from the prior
- Latent space interpolation: smoothly morph between two data points
- Limitations: generated samples tend to be blurry; the learned prior is too simple
- Disentangled VAEs (β-VAE): encourage interpretable latent dimensions

**3. Generative Adversarial Networks (GANs)**
The adversarial training framework that produced photorealistic image generation.
- **Generator:** takes random noise as input; produces synthetic data
- **Discriminator:** tries to distinguish real data from generated data
- **Minimax game:** generator minimizes discriminator's ability to tell real from fake; discriminator maximizes it
- GAN training instability: mode collapse, vanishing gradients — notoriously difficult to train
- Key architectural milestones:
  - **DCGAN:** deep convolutional GAN; the first stable GAN architecture
  - **Progressive GAN:** train at low resolution first, progressively increase resolution; produced stunning 1024px faces
  - **StyleGAN / StyleGAN2/3:** control image style at different levels of the hierarchy; the standard for high-quality face generation
  - **Pix2Pix:** image-to-image translation with paired data (sketch → photo, map → satellite)
  - **CycleGAN:** unpaired image-to-image translation; the domain adaptation breakthrough
  - **BigGAN:** conditioning on class labels for diverse, controllable generation
- Applications: data augmentation, face generation, image editing, art

**4. Normalizing Flows**
- Transform a simple distribution (Gaussian) into a complex one through a series of invertible transformations
- Exact likelihood computation (unlike VAEs and GANs)
- RealNVP, Glow: the key flow architectures
- Application: density estimation, exact sampling; used in some scientific AI

**5. Diffusion Models — The Dominant Paradigm**
Diffusion models overtook GANs because they are more stable to train and produce higher-quality, more diverse outputs.
- **Forward process:** gradually add Gaussian noise to data over T timesteps until it becomes pure noise
- **Reverse process:** train a neural network to denoise step by step; learned denoising is learned generation
- **DDPM (Denoising Diffusion Probabilistic Models, 2020):** the foundational paper
- **DDIM:** deterministic sampling; dramatically fewer steps needed at inference; speeds up generation 10–50×
- **Score matching:** the theoretical underpinning; learn the score function (gradient of log probability)
- **Classifier-Free Guidance (CFG):** condition generation on text without a separate classifier; the technique that made text-to-image work well
- **Latent Diffusion Models (LDM):** run diffusion in a compressed latent space, not pixel space; makes it computationally feasible → this is how Stable Diffusion works
- **CLIP text encoder + U-Net denoiser:** the architecture of Stable Diffusion and DALL-E 2
- **DiT (Diffusion Transformer):** replace the U-Net with a transformer for the denoiser; better scaling; the architecture behind Stable Diffusion 3, Sora
- **Sora (OpenAI):** video generation using a DiT operating over spatiotemporal patches of video tokens

**6. Audio Generation**
- **WaveNet (DeepMind, 2016):** autoregressive model for raw audio waveforms; breakthrough quality; too slow for real-time
- **WaveRNN, WaveGlow:** faster alternatives
- **Tacotron 2:** text → mel spectrogram → WaveNet vocoder; the pipeline behind Google's TTS
- **VALL-E (Microsoft):** neural codec language model for zero-shot text-to-speech with 3-second voice cloning
- **AudioLM:** language modeling applied to audio; generates speech, music, and sound effects
- **Diffusion for audio:** DiffWave, AudioLDM, Stable Audio
- **Music generation:** Jukebox (OpenAI), MusicLM (Google), AudioCraft (Meta)

**7. Video Generation**
- The hardest generative task: temporal consistency, physical plausibility, motion coherence
- Extending image diffusion to video: 3D U-Nets, temporal attention
- Key challenge: generating hours of video requires an efficient representation of the temporal dimension
- Sora's approach: video as sequences of spatiotemporal patches; scale transforms the quality

**8. Evaluating Generative Models**
- **FID (Fréchet Inception Distance):** measures the statistical distance between real and generated image distributions; lower = better
- **Inception Score (IS):** measures both quality (high confidence predictions) and diversity (varied classes)
- **CLIP Score:** measures alignment between generated image and the text prompt that generated it
- **Human evaluation:** still required for nuanced quality assessment

### Resource Stack

**Papers**
- "Auto-Encoding Variational Bayes" (VAE) — Kingma & Welling (2013) → https://arxiv.org/abs/1312.6114
- "Generative Adversarial Networks" — Goodfellow et al. (2014) → https://arxiv.org/abs/1406.2661
- "Denoising Diffusion Probabilistic Models" — Ho et al. (2020) → https://arxiv.org/abs/2006.11239
- "High-Resolution Image Synthesis with Latent Diffusion Models" (Stable Diffusion) — Rombach et al. (2022) → https://arxiv.org/abs/2112.10752
- "DALL-E 2" — Ramesh et al. (2022) → https://arxiv.org/abs/2204.06125
- "Scalable Diffusion Models with Transformers" (DiT) — Peebles & Xie (2022) → https://arxiv.org/abs/2212.09748
- "Video generation models as world simulators" (Sora) → https://openai.com/research/video-generation-models-as-world-simulators

**Courses**
- Generative AI with Large Language Models — DeepLearning.AI → https://www.coursera.org/learn/generative-ai-with-llms
- How Diffusion Models Work — DeepLearning.AI (short course) → https://www.deeplearning.ai/short-courses/how-diffusion-models-work/

**YouTube / Blogs**
- What are Diffusion Models? — Lilian Weng → https://lilianweng.github.io/posts/2021-07-11-diffusion-models/
- Diffusion Models Explained — Yannic Kilcher → https://www.youtube.com/watch?v=344w5h24-h8
- GAN Foundations — Two Minute Papers → https://www.youtube.com/@TwoMinutePapers

---

## Phase 9 — Agentic AI

**Goal:** Understand AI agents — systems that can perceive, reason, plan, and act in the world across multiple steps. This is the current frontier of applied AI and the area evolving fastest.

### Core Topics

**1. What is an AI Agent?**
A language model becomes an agent when it can take actions in the world across multiple steps.

The agent loop:
- **Perceive:** receive observations (user input, tool results, memory)
- **Reason:** plan next action
- **Act:** call a tool, write to memory, or produce output
- **Observe:** receive the result
- Repeat until task complete

**2. Tool Use and Function Calling**
- Structured output signaling "call this function with these arguments"
- Tool schemas: defining tools in JSON
- Tool categories: search, code execution, file I/O, API calls, browser control, database queries
- Parallel tool use: calling multiple tools simultaneously when independent

**3. Reasoning Frameworks**
- **ReAct:** Thought → Action → Observation, interleaved
- **Plan-and-Execute:** generate full plan first, then execute step by step
- **Reflexion:** agent reflects on failures and revises strategy; verbal reinforcement learning

**4. Memory Systems in Agents**
- **In-context memory:** the active context window — fast but limited
- **External memory (RAG):** semantic search over a vector store — primary solution for long-term memory
- **Episodic memory:** records of past interactions
- **Semantic memory:** structured facts (knowledge graphs, entity stores)
- **Procedural memory:** encoded behavioral patterns from fine-tuning
- The memory-context boundary problem: what gets pulled into context, when, and how much of the window it consumes

**5. The Context Window Problem**
- Attention is O(n²) in sequence length — longer context is dramatically more expensive
- Lost-in-the-middle: models perform worse on information in the middle of long contexts
- KV-Cache: storing key-value pairs from previous tokens to avoid recomputation
- Current solutions: better position encodings, state space models, learned context compression

**6. Multi-Agent Systems**
- Orchestrator-subagent pattern
- Debate and critique between agents
- CrewAI, AutoGen, LangGraph — key frameworks
- The alignment problem multiplied: misaligned agents in a network

**7. Reliability Problems**
- Hallucinated tool calls, stuck loops, scope creep
- Error propagation: mistakes compound across long trajectories
- Human-in-the-loop design: when to pause for human confirmation

### Resource Stack

**Papers**
- "ReAct: Synergizing Reasoning and Acting in Language Models" — Yao et al. (2022) → https://arxiv.org/abs/2210.03629
- "Toolformer: Language Models Can Teach Themselves to Use Tools" — Schick et al. (2023) → https://arxiv.org/abs/2302.04761
- "Generative Agents: Interactive Simulacra of Human Behavior" — Park et al. (2023) → https://arxiv.org/abs/2304.03442
- "Reflexion: Language Agents with Verbal Reinforcement Learning" — Shinn et al. (2023) → https://arxiv.org/abs/2303.11366

**Courses**
- AI Agents in LangGraph — DeepLearning.AI → https://www.deeplearning.ai/short-courses/ai-agents-in-langgraph/
- Multi AI Agent Systems with CrewAI — DeepLearning.AI → https://www.deeplearning.ai/short-courses/multi-ai-agent-systems-with-crewai/

**Blogs**
- LLM Powered Autonomous Agents — Lilian Weng → https://lilianweng.github.io/posts/2023-06-23-agent/
- MCP Documentation → https://modelcontextprotocol.io/

**Documentation**
- LangGraph → https://langchain-ai.github.io/langgraph/
- AutoGen → https://microsoft.github.io/autogen/

---

## Phase 10 — The Hard Problems

**Goal:** Engage seriously with the unsolved problems in AI. This separates people who use AI from people who advance it.

### Core Topics

**1. The Hallucination Problem**
LLMs generate text that is statistically plausible but factually wrong — confidently. This is not a bug. It is a structural property.
- Why it happens: the model optimizes for plausible continuations, not ground truth retrieval
- Faithfulness vs. factuality
- Calibration: a well-calibrated model's confidence should match its accuracy
- **Mitigation:** RAG, self-consistency, chain-of-verification, citation grounding, tool-augmented generation
- Research direction: process reward models — scoring intermediate reasoning steps, not just final answers

**2. Reasoning vs. Pattern Matching**
The deepest ongoing debate: do LLMs reason, or do they do sophisticated pattern matching?
- ARC-AGI (François Chollet): tasks requiring out-of-distribution reasoning
- Chain-of-thought as scaffold vs. elicitation of memorized patterns
- Test-time compute scaling: letting models think longer (the o1/o3 paradigm)

**3. AI Safety and Alignment**
- Goal misgeneralization, reward hacking, specification gaming
- Deceptive alignment: behaves well during training; diverges in deployment
- Superalignment: aligning AI systems smarter than humans

**4. Interpretability and Explainability**
- **XAI (post-hoc):** LIME, SHAP, attention visualization
- **Mechanistic Interpretability:** understanding what circuits and algorithms actually run inside the model
  - Circuits analysis: identifying what specific model components compute
  - Superposition: models store more features than they have dimensions for
  - Sparse Autoencoders (SAEs): extract interpretable features from activations
  - Anthropic's feature visualization: finding human-interpretable concepts in model weights

**5. AI Ethics and Bias**
A separate and essential topic from safety. Safety asks "will the system cause harm"; ethics asks "is the system fair?"
- **Dataset bias:** if training data underrepresents a group, the model will too
- **Representation bias:** word embeddings encode human stereotypes (woman → nurse, man → doctor)
- **Measurement bias:** labeling biases in datasets (human annotators have assumptions)
- **Algorithmic bias:** a model optimizing aggregate accuracy may underperform on minority groups
- **Fairness metrics:** demographic parity, equalized odds, individual fairness — and why they are mathematically incompatible
- **Model Cards:** documentation of a model's training data, intended use, performance across groups, limitations — the tool for communicating bias honestly
- **Datasheets for Datasets:** equivalent documentation for datasets
- Responsible AI frameworks: Google's PAIR, Microsoft's Responsible AI Standard
- The dual-use problem: the same capability that is useful can be harmful in different hands

**6. Benchmarks and Evaluation Standards**
The field measures progress through benchmarks. Understanding them — and their failures — is essential.
- **GLUE / SuperGLUE:** the NLP benchmarks that defined the pre-LLM era; now saturated
- **MMLU (Massive Multitask Language Understanding):** 57 academic subjects; the primary LLM knowledge benchmark → https://paperswithcode.com/dataset/mmlu
- **HellaSwag:** commonsense reasoning through sentence completion
- **ARC (AI2 Reasoning Challenge):** grade-school science questions; tests genuine reasoning
- **WinoGrande:** Winograd schema pronoun resolution; tests commonsense
- **HumanEval:** 164 Python programming problems; the standard code generation benchmark
- **MATH:** competition math; the hardest reasoning benchmark until reasoning models broke it
- **ARC-AGI:** abstract visual reasoning; designed to be unsolvable by pattern matching
- **HELM:** holistic evaluation across many dimensions simultaneously
- **Benchmark contamination:** test data leaked into training data; makes scores meaningless; a major credibility problem for the field
- Why no single benchmark captures general intelligence: Goodhart's Law applied to evaluation

**7. Efficiency and Compute Constraints**
- Energy cost of training frontier models
- Mixture-of-Experts (MoE): not all parameters active per token; GPT-4, Mixtral, DeepSeek architecture
- FlashAttention, linear attention variants
- Hardware: NVIDIA GPUs, TPUs, Groq, Cerebras, Trainium

**8. Privacy-Preserving AI and Federated Learning**
- **Federated Learning:** train across distributed devices without centralizing data; Google Keyboard, Apple's on-device models
- **Differential Privacy:** mathematical guarantee that individual data points cannot be inferred from model outputs; used in training
- **Homomorphic Encryption for AI:** compute on encrypted data — theoretically important, practically expensive
- **On-device AI:** running models on phones and edge devices; Apple Intelligence, Gemini Nano, Phi-3 Mini
- Why this matters: privacy regulations, sensitive data (medical, financial), latency, cost

**9. Knowledge Graphs and GraphRAG**
- Knowledge graphs: entities and relationships represented as a graph (Wikidata, Freebase, corporate KGs)
- Knowledge graph embeddings (TransE, RotatE): learn vector representations that preserve graph structure
- **GraphRAG (Microsoft):** combining knowledge graph structure with RAG; retrieve from a graph rather than flat documents; better for complex multi-hop reasoning
- Ontologies and semantic web: the formal layer underlying structured knowledge

### Resource Stack

**Papers**
- "On the Measure of Intelligence" — François Chollet (2019) → https://arxiv.org/abs/1911.01547
- "Toy Models of Superposition" — Elman et al., Anthropic (2022) → https://transformer-circuits.pub/2022/toy_model/index.html
- "Scaling Monosemanticity" — Templeton et al., Anthropic (2024) → https://transformer-circuits.pub/2024/scaling-monosemanticity/index.html
- "Concrete Problems in AI Safety" — Amodei et al. (2016) → https://arxiv.org/abs/1606.06565
- "Risks from Learned Optimization" (Deceptive Alignment) — Hubinger et al. (2019) → https://arxiv.org/abs/1906.01820
- "AI Safety via Debate" — Irving et al. (2018) → https://arxiv.org/abs/1805.00899
- "Model Cards for Model Reporting" — Mitchell et al. (2019) → https://arxiv.org/abs/1810.03993
- "Datasheets for Datasets" — Gebru et al. (2021) → https://arxiv.org/abs/1803.09010

**Books**
- *The Alignment Problem* — Brian Christian → https://www.amazon.com/Alignment-Problem-Machine-Learning-Values/dp/0393635821
- *Human Compatible* — Stuart Russell → https://www.amazon.com/Human-Compatible-Artificial-Intelligence-Problem/dp/0525558616
- *Weapons of Math Destruction* — Cathy O'Neil → https://www.amazon.com/Weapons-Math-Destruction-Increases-Inequality/dp/0553418831 (essential on algorithmic bias)

**Blogs**
- Anthropic Research → https://www.anthropic.com/research
- Alignment Forum → https://www.alignmentforum.org/
- The Bitter Lesson — Richard Sutton → http://www.incompleteideas.net/IncIdeas/BitterLesson.html
- Paul Christiano's Blog → https://ai-alignment.com/
- Lilian Weng on Hallucination → https://lilianweng.github.io/posts/2024-07-07-hallucination/

**YouTube**
- Robert Miles AI Safety → https://www.youtube.com/@RobertMilesAI
- Papers with Code (benchmark leaderboards) → https://paperswithcode.com/

---

## Phase 11 — Building: From User to Creator

**Goal:** Build production-quality AI systems. Move from understanding models to shipping systems.

### Core Topics

**1. API Integration and Production Patterns**
- Structured outputs: constraining model outputs to valid JSON schemas
- Streaming responses: token-by-token delivery for better UX
- Rate limiting, retries, fallback strategies
- Cost estimation: token counting, pricing models, cost optimization
- Async patterns for concurrent requests

**2. Evaluation — The Most Underrated Skill**
- **Deterministic evaluation:** test cases with known correct answers
- **LLM-as-judge:** using a strong model to evaluate another model's outputs (G-Eval framework)
- **RAGAS:** evaluating RAG systems on faithfulness, context precision, context recall, answer relevance
- Human evaluation design and aggregation
- Building eval datasets: golden datasets, adversarial sets, domain-specific suites
- A/B testing in production

**3. RAG Systems in Production**
- Chunking strategy selection
- Embedding model selection trade-offs
- Reranking with cross-encoders
- Hybrid search (dense + BM25)
- Multi-turn conversation context management
- Monitoring and debugging retrieval quality

**4. AI Infrastructure and Cloud**
- **AWS SageMaker:** end-to-end ML platform; managed training, tuning, deployment → https://aws.amazon.com/sagemaker/
- **Google Vertex AI:** Google's equivalent; Gemini integration, AutoML → https://cloud.google.com/vertex-ai
- **Azure Machine Learning:** Microsoft's platform; tight GitHub/DevOps integration → https://azure.microsoft.com/en-us/products/machine-learning
- **Weights & Biases (W&B):** experiment tracking, hyperparameter sweeps, model registry — the standard for research and production → https://wandb.ai/
- **MLflow:** open-source experiment tracking and model registry → https://mlflow.org/
- **DVC (Data Version Control):** version control for datasets and models → https://dvc.org/
- GPU clusters: multi-node training setup, SLURM job scheduling
- Docker and Kubernetes for AI services

**5. Inference and Deployment**
- **vLLM:** the dominant open-source LLM inference server; PagedAttention for efficient KV cache management → https://docs.vllm.ai/
- **TGI (Text Generation Inference):** HuggingFace's inference server → https://huggingface.co/docs/text-generation-inference/
- **Ollama:** running LLMs locally → https://ollama.com/
- Latency optimization: batching, caching, speculative decoding
- Observability: LangSmith, Langfuse, Helicone

**6. Observability and Monitoring**
- **LangSmith:** tracing, evaluation, and debugging for LangChain-based apps → https://docs.smith.langchain.com/
- **Langfuse:** open-source LLM observability → https://langfuse.com/
- **Helicone:** lightweight LLM proxy with logging → https://www.helicone.ai/
- Tracking: token usage, latency, cost per request, error rates
- Detecting model drift and performance degradation in production

**7. Fine-tuning in Practice**
- When to fine-tune vs. prompt vs. RAG (prompt and RAG first — always)
- Dataset preparation: format, size, quality
- LoRA/QLoRA with HuggingFace PEFT
- Catastrophic forgetting: fine-tuning on narrow data degrades general capabilities

**8. Security and Red-teaming**
- Prompt injection: malicious inputs that override system instructions
- Data extraction attacks: leaking system prompt or training data
- Jailbreaking: bypassing safety guardrails
- Red-teaming: adversarial testing before deployment
- Input/output filtering and content moderation layers

**9. Building AI Products**
- The product thinking layer: what problem does this solve? Why is AI the right approach?
- Human-in-the-loop design: when to pause for human confirmation
- Failure mode design: what happens when the model is wrong?
- Trust and transparency: communicating model uncertainty to users
- Latency vs. quality trade-offs in UX design

### Resource Stack

**Courses**
- LLMOps — DeepLearning.AI → https://www.deeplearning.ai/short-courses/llmops/
- Full Stack Deep Learning → https://fullstackdeeplearning.com/
- Automated Testing for LLMOps — DeepLearning.AI → https://www.deeplearning.ai/short-courses/automated-testing-llmops/

**Books**
- *Designing Machine Learning Systems* — Chip Huyen → https://www.oreilly.com/library/view/designing-machine-learning/9781098107956/

**Blogs**
- Hamel Husain — LLM evaluation in practice → https://hamel.dev/
- Eugene Yan — applied ML and LLM systems → https://eugeneyan.com/
- Simon Willison — security, tools, practical LLM observations → https://simonwillison.net/

**Documentation**
- Anthropic API Docs → https://docs.anthropic.com/
- OpenAI Cookbook → https://github.com/openai/openai-cookbook
- LangChain Docs → https://python.langchain.com/docs/introduction/
- RAGAS → https://docs.ragas.io/
- vLLM → https://docs.vllm.ai/
- LangSmith → https://docs.smith.langchain.com/
- W&B Documentation → https://docs.wandb.ai/

---

## Phase 12 — The Frontier

**Goal:** Develop the ability to track, understand, and eventually contribute to the research frontier.

### Core Topics

**1. Reasoning Models and Test-Time Compute Scaling**
The next paradigm shift: scale compute at inference, not just training.
- **OpenAI o1, o3:** trained to generate long internal chains of thought before producing output
- **DeepSeek-R1:** open-source reasoning model trained with GRPO; matched closed frontier models
- **Process Reward Models (PRMs):** score intermediate reasoning steps, not just final answers
- MCTS over reasoning trajectories
- Test-time compute vs. training compute trade-offs

**2. World Models and Embodied AI**
- World models: internal simulation of the state of the world; predict consequences of actions
- Video generation as world modeling (Sora, Genie 2)
- Embodied AI: models that perceive and act in physical environments
- RT-2, π0 (Physical Intelligence): vision-language-action models for robotics
- The embodiment hypothesis: that general intelligence requires physical grounding

**3. Neuro-Symbolic AI**
- Neural (learned) vs. symbolic (logical) — the oldest divide in AI
- LLMs generating formal programs (Python, SQL, Prolog) and executing them
- Program synthesis: learning to write programs from examples or descriptions
- Graph neural networks and knowledge graph integration
- Why pure neural approaches may have limits that hybrid approaches address

**4. AI in Science**
- **AlphaFold 2/3 (DeepMind):** solved the 50-year protein structure prediction problem; one of the most significant scientific achievements of the century
- AlphaMath, AlphaProof: AI for mathematical proof and reasoning
- AI for drug discovery: generative models for molecular design
- Climate modeling, materials science, particle physics
- The epistemological question: when AI discovers something, do we understand why?

**5. What Comes After Transformers?**
- **State Space Models (SSMs) — Mamba:** linear-time sequence modeling; may handle long sequences more efficiently than attention
- **Mixture-of-Experts (MoE):** not all parameters active per token; the architecture of most closed frontier models
- **Kolmogorov-Arnold Networks (KANs):** learnable activation functions on edges rather than nodes; alternative to MLPs
- Whether the transformer will be the final major architecture or a stepping stone

**6. Synthetic Data and the Data Wall**
- The growing concern that high-quality human-generated text is running out for training
- Synthetic data generation: using models to generate training data for future models
- Distillation through synthetic data: the Phi-3 / Orca approach — small models trained on GPT-4-generated data
- Self-play and self-improvement: can a model bootstrap its own intelligence?

**7. AGI: The Timeline and Definition Debate**
- The definition problem: no consensus on what AGI means or how to test for it
- ARC-AGI as a proxy for general intelligence
- Current frontier capabilities and their limits
- Key positions: imminent AGI (Altman, Hassabis), skeptics (LeCun, Marcus), nuanced middle
- What changes about the world if AGI arrives in 5 vs. 20 vs. never

**8. AI Governance, Regulation, and Geopolitics**
- US-China semiconductor export controls and their effect on AI development
- **EU AI Act:** the first major AI-specific regulatory framework; risk-based categorization
- Frontier AI safety commitments (the Bletchley Declaration)
- Compute governance: regulation at the chip and training run level
- Open-source vs. closed frontier models: the policy debate
- AI and the future of knowledge work, scientific research, economic distribution

### Resource Stack

**Papers**
- "Scaling LLM Test-Time Compute Optimally" — Snell et al. (2024) → https://arxiv.org/abs/2408.03314
- "DeepSeek-R1: Incentivizing Reasoning Capability via RL" (2025) → https://arxiv.org/abs/2501.12948
- "Highly Accurate Protein Structure Prediction with AlphaFold" — Jumper et al. (2021) → https://www.nature.com/articles/s41586-021-03819-2
- "Mamba: Linear-Time Sequence Modeling with Selective State Spaces" — Gu & Dao (2023) → https://arxiv.org/abs/2312.00752
- "ARC: Abstraction and Reasoning Corpus" — Chollet (2019) → https://arxiv.org/abs/1911.01547

**Newsletters**
- Import AI — Jack Clark → https://importai.substack.com/
- The Gradient → https://thegradient.pub/
- Interconnects — Nathan Lambert → https://www.interconnects.ai/
- Papers with Code → https://paperswithcode.com/
- Arxiv Sanity → https://arxiv-sanity-lite.com/
- The Turing Post → https://www.turingpost.com/

**Podcasts and Long-form**
- Dwarkesh Patel Podcast → https://www.dwarkeshpatel.com/podcast
- Lex Fridman Podcast → https://lexfridman.com/podcast/
- Machine Learning Street Talk → https://www.youtube.com/@MachineLearningStreetTalk

**Labs and Institutions to Follow**
- Anthropic Research → https://www.anthropic.com/research
- DeepMind → https://deepmind.google/research/
- OpenAI Research → https://openai.com/research
- Alignment Research Center → https://www.alignment.org/
- Redwood Research → https://www.redwoodresearch.org/

---

## The Parallel Track: Becoming a Creator, Not Just a User

Running alongside all twelve phases, these practices separate the top 1% from everyone else.

**Build in Public**
Every phase has a project. Do not wait until Phase 11 to build. Build a toy LM in Phase 6. Build a RAG system in Phase 7. Build an agent in Phase 9. The act of building reveals what you do not understand.

**Read Primary Sources**
The blog post is someone's interpretation of the paper. Read the paper. Papers are not as hard as they look. Start with the abstract, introduction, and conclusion. Then the figures. Then the experiments. The math comes last.

**Develop a Point of View**
The goal of learning is not to absorb information. It is to have a real opinion about contested questions: Is scaling sufficient for AGI? Is RLHF enough for alignment? Do LLMs reason or pattern match? Your answer will be wrong in interesting ways. That is the point.

**Write About What You Learn**
Write a post explaining attention to someone without linear algebra. Write a critique of RAG as a memory solution. Explain why chain-of-thought might be an illusion. The act of writing reveals what you actually know.

**Track the Frontier Weekly**
The field moves fast. Build a system: a fixed set of sources checked weekly, a practice of noting which papers matter, and a habit of connecting the new to what you already know.

---

## Recommended Learning Sequence

| Month | Primary Focus | Secondary |
|-------|-------------|-----------|
| 1–2 | Phase 0 (orientation) + Phase 1 (math) | Begin Python if needed |
| 3–4 | Phase 2 (classical ML) | First Scikit-learn project |
| 5–6 | Phase 3 (NLP) | Build a text classifier; implement TF-IDF from scratch |
| 7–9 | Phase 4 (deep learning) | Build a CNN; implement backprop from scratch |
| 10 | Phase 5 (reinforcement learning) | Implement Q-learning on CartPole |
| 11–12 | Phase 6 (transformers) | Build a GPT following Karpathy |
| 13–15 | Phase 7 (LLMs) | Build first RAG application; prompt engineering experiments |
| 16–17 | Phase 8 (generative models) | Run Stable Diffusion locally; read the DDPM paper |
| 18–19 | Phase 9 (agents) | Build a tool-using agent with LangGraph |
| 20–21 | Phase 10 (hard problems) | Read papers; write responses; engage Alignment Forum |
| 22–24 | Phase 11 (building) | Ship something real with evals, monitoring, and users |
| 25+ | Phase 12 (frontier) + continuous | Weekly paper review; track labs; start contributing |

---

*This roadmap will evolve. The field does not stay still. The measure of whether you have internalized it is not whether you reach Phase 12 — it is whether, by Phase 9, you are starting to generate your own questions about what comes next.*

---

*Colloque AI Resources — Learning Path*
