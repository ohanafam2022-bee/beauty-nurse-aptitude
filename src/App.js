import React, { useState } from 'react';
import { Heart, Sparkles, TrendingUp, Users, Award, Target } from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

const BeautyNurseAptitudeTest = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);

  const questions = [
    {
      id: 1,
      text: '仕事で一番やりがいを感じる瞬間は？',
      options: [
        { text: '患者さんの笑顔や「ありがとう」をもらえたとき', weights: { hospitality: 3, counseling: 2, balance: 1 } },
        { text: '技術を磨いて自分の成長を感じられたとき', weights: { technical: 3, leader: 1, balance: 1 } },
        { text: '数字や成果が出て評価されたとき', weights: { sales: 3, leader: 1 } }
      ]
    },
    {
      id: 2,
      text: 'チームで働くとき、あなたが意識していることは？',
      options: [
        { text: '周りとのコミュニケーションを大切にする', weights: { hospitality: 2, counseling: 2, balance: 2 } },
        { text: '自分の役割を完璧にこなす', weights: { technical: 3, balance: 1 } },
        { text: '結果を出してチームに貢献する', weights: { sales: 3, leader: 2 } }
      ]
    },
    {
      id: 3,
      text: '新しい知識や技術を学ぶときのスタンスは？',
      options: [
        { text: '丁寧に手順を守って確実に身につけたい', weights: { hospitality: 2, technical: 1, balance: 2 } },
        { text: '実践しながらスピード重視で覚えたい', weights: { sales: 2, leader: 2 } },
        { text: '自分なりに工夫して成果を出したい', weights: { technical: 2, sales: 1, leader: 1 } }
      ]
    },
    {
      id: 4,
      text: 'あなたが美容医療に興味を持ったきっかけは？',
      options: [
        { text: '「人をキレイにして喜ばせたい」と思ったから', weights: { hospitality: 3, counseling: 2 } },
        { text: '医療スキルを新しい分野で活かしたいと思ったから', weights: { technical: 3, balance: 1 } },
        { text: '将来的に収入やキャリアを上げたいと思ったから', weights: { sales: 3, leader: 2 } }
      ]
    },
    {
      id: 5,
      text: '職場でストレスを感じやすいのはどんなとき？',
      options: [
        { text: '人間関係がギスギスしているとき', weights: { hospitality: 2, counseling: 3, balance: 2 } },
        { text: '自分の成長が感じられないとき', weights: { technical: 3, leader: 1 } },
        { text: '努力が数字や評価に反映されないとき', weights: { sales: 3, leader: 1 } }
      ]
    },
    {
      id: 6,
      text: '患者さんとの接し方で、あなたに近いのは？',
      options: [
        { text: '一人ひとりに丁寧に寄り添うタイプ', weights: { hospitality: 3, counseling: 3 } },
        { text: '必要なことを的確に伝えるタイプ', weights: { technical: 2, balance: 2 } },
        { text: '明るくテンポよくコミュニケーションを取るタイプ', weights: { sales: 3, leader: 1 } }
      ]
    },
    {
      id: 7,
      text: 'あなたが大切にしている"働き方の価値観"は？',
      options: [
        { text: '安心・安定して長く働けること', weights: { hospitality: 2, balance: 3 } },
        { text: 'スキルアップ・専門性の向上', weights: { technical: 3, leader: 1 } },
        { text: '成果が評価される環境で挑戦すること', weights: { sales: 3, leader: 2 } }
      ]
    },
    {
      id: 8,
      text: '将来的に目指したいキャリア像は？',
      options: [
        { text: '美容皮膚科でリピーターに信頼されるナース', weights: { hospitality: 3, counseling: 2, balance: 1 } },
        { text: '美容外科で技術を極めるスペシャリスト', weights: { technical: 3, leader: 1 } },
        { text: '売上・評価を伸ばすトップナース', weights: { sales: 3, leader: 2 } }
      ]
    },
    {
      id: 9,
      text: '職場選びで一番重視したいポイントは？',
      options: [
        { text: '人間関係・雰囲気の良さ', weights: { hospitality: 2, counseling: 2, balance: 2 } },
        { text: '教育体制・成長機会', weights: { technical: 2, leader: 3 } },
        { text: '給与・評価・待遇の良さ', weights: { sales: 3, balance: 1 } }
      ]
    },
    {
      id: 10,
      text: 'どんな職場で一番輝けると思う？',
      options: [
        { text: '丁寧な接客で信頼を積み重ねる職場', weights: { hospitality: 3, counseling: 2 } },
        { text: 'スピード感とスキルを求められる現場', weights: { technical: 3, sales: 1 } },
        { text: '成果が数字で見える競争的な職場', weights: { sales: 3, leader: 2 } }
      ]
    }
  ];

  const resultTypes = {
    hospitality: {
      icon: Heart,
      color: 'bg-pink-500',
      chartColor: '#ec4899',
      name: 'ホスピタリティ型',
      description: '共感・丁寧・安心感重視',
      workplace: '美容皮膚科・フェイシャル',
      advice: '丁寧な接客と安心感が強み。リピート率の高い院で輝けます。',
      cta: 'あなたの"おもてなし力"を活かせる美容皮膚科をご紹介します'
    },
    technical: {
      icon: Target,
      color: 'bg-blue-500',
      chartColor: '#3b82f6',
      name: 'テクニカル型',
      description: '成長意欲・技術志向',
      workplace: '美容外科・再生医療',
      advice: '最新施術やオペに携わる環境で力を発揮',
      cta: 'あなたのスキルを伸ばせるクリニックを一緒に見つけましょう'
    },
    sales: {
      icon: TrendingUp,
      color: 'bg-green-500',
      chartColor: '#10b981',
      name: 'セールス型',
      description: '成果・挑戦・収入志向',
      workplace: '自由診療・高歩合クリニック',
      advice: '接遇＋成果で高収入を狙えるタイプ',
      cta: '成果が正当に評価される職場をご紹介します'
    },
    counseling: {
      icon: Users,
      color: 'bg-purple-500',
      chartColor: '#a855f7',
      name: 'カウンセリング型',
      description: '傾聴力・心理的サポート',
      workplace: '医療脱毛・カウンセリング重視院',
      advice: '丁寧なヒアリング力を活かせる職場が最適',
      cta: 'あなたの共感力を活かせる院を無料でご提案'
    },
    balance: {
      icon: Sparkles,
      color: 'bg-yellow-500',
      chartColor: '#eab308',
      name: 'バランス型',
      description: '協調・柔軟・安定志向',
      workplace: '総合美容クリニック',
      advice: '複数ジャンルで経験を積むと強みが活きる',
      cta: '理想のバランスを叶える転職プランを提案します'
    },
    leader: {
      icon: Award,
      color: 'bg-red-500',
      chartColor: '#ef4444',
      name: 'リーダー型',
      description: '教育・マネジメント志向',
      workplace: '大手クリニック・教育担当ポジション',
      advice: 'マネ職や教育担当としての成長に◎',
      cta: 'キャリアアップできる美容ナース転職相談へ'
    }
  };

  const calculateResult = (answerList) => {
    const scores = {
      hospitality: 0,
      technical: 0,
      sales: 0,
      counseling: 0,
      balance: 0,
      leader: 0
    };

    answerList.forEach(answer => {
      Object.keys(answer.weights).forEach(type => {
        scores[type] += answer.weights[type];
      });
    });

    const maxScore = Math.max(...Object.values(scores));
    const topType = Object.keys(scores).find(key => scores[key] === maxScore);

    return { type: topType, scores };
  };

  const handleAnswer = (option) => {
    const newAnswers = [...answers, option];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const resultData = calculateResult(newAnswers);
      setResult(resultData);
    }
  };

  const resetTest = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setResult(null);
  };

  if (result) {
    const resultData = resultTypes[result.type];
    const IconComponent = resultData.icon;

    const maxScore = Math.max(...Object.values(result.scores));
    const radarData = Object.keys(resultTypes).map(key => ({
      subject: resultTypes[key].name.replace('型', ''),
      score: result.scores[key],
      fullMark: maxScore
    }));

    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 p-4 sm:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-12">
            <div className="text-center mb-8">
              <div className={`inline-flex items-center justify-center w-20 h-20 ${resultData.color} rounded-full mb-4`}>
                <IconComponent className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">診断結果</h2>
              <div className={`inline-block ${resultData.color} text-white px-6 py-2 rounded-full text-xl font-bold mb-4`}>
                {resultData.name}
              </div>
              <p className="text-gray-600 text-lg">{resultData.description}</p>
            </div>

            <div className="mb-8 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6">
              <h3 className="text-center font-bold text-gray-800 mb-6 text-lg">あなたの適性バランス</h3>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={radarData}>
                  <PolarGrid strokeDasharray="3 3" />
                  <PolarAngleAxis 
                    dataKey="subject" 
                    tick={{ fill: '#4b5563', fontSize: 12 }}
                  />
                  <PolarRadiusAxis angle={90} domain={[0, maxScore]} tick={false} />
                  <Radar
                    name="適性スコア"
                    dataKey="score"
                    stroke={resultData.chartColor}
                    fill={resultData.chartColor}
                    fillOpacity={0.6}
                  />
                </RadarChart>
              </ResponsiveContainer>
              <p className="text-center text-sm text-gray-600 mt-4">
                6つのタイプ別に適性を可視化しました
              </p>
            </div>

            <div className="space-y-6 mb-8">
              <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-6">
                <h3 className="font-bold text-gray-800 mb-2 flex items-center">
                  <Sparkles className="w-5 h-5 mr-2 text-purple-500" />
                  おすすめ職場
                </h3>
                <p className="text-gray-700">{resultData.workplace}</p>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6">
                <h3 className="font-bold text-gray-800 mb-2 flex items-center">
                  <Target className="w-5 h-5 mr-2 text-blue-500" />
                  キャリアアドバイス
                </h3>
                <p className="text-gray-700">{resultData.advice}</p>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6">
                <h3 className="font-bold text-gray-800 mb-2 flex items-center">
                  <Heart className="w-5 h-5 mr-2 text-green-500" />
                  次のステップ
                </h3>
                <p className="text-gray-700 mb-4">{resultData.cta}</p>
                <button className={`w-full ${resultData.color} text-white font-bold py-3 px-6 rounded-full hover:opacity-90 transition-opacity`}>
                  無料転職相談を申し込む
                </button>
              </div>
            </div>

            <button
              onClick={resetTest}
              className="w-full bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-full hover:bg-gray-300 transition-colors"
            >
              もう一度診断する
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 p-4 sm:p-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full mb-4">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
            美容ナース適性診断
          </h1>
          <p className="text-gray-600">あなたにぴったりの美容医療キャリアを見つけましょう</p>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-10">
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-semibold text-purple-600">
                質問 {currentQuestion + 1} / {questions.length}
              </span>
              <span className="text-sm text-gray-500">
                {Math.round(((currentQuestion + 1) / questions.length) * 100)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-pink-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6">
              {questions[currentQuestion].text}
            </h2>
            <div className="space-y-4">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  className="w-full text-left p-5 rounded-2xl border-2 border-gray-200 hover:border-purple-400 hover:bg-purple-50 transition-all duration-300 group"
                >
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-gray-100 group-hover:bg-purple-500 flex items-center justify-center mr-4 transition-colors flex-shrink-0">
                      <span className="text-gray-600 group-hover:text-white font-semibold transition-colors">
                        {String.fromCharCode(65 + index)}
                      </span>
                    </div>
                    <span className="text-gray-700 group-hover:text-gray-900 font-medium">
                      {option.text}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeautyNurseAptitudeTest;